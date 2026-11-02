import importlib.util
import json
from pathlib import Path
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("check_pi_public", Path(__file__).with_name("check-pi-public.py"))
checker = importlib.util.module_from_spec(spec)
spec.loader.exec_module(checker)


class PublicPiConfigTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)

    def write_json(self, value):
        (self.root / "models.json").write_text(json.dumps(value))

    def test_public_connection_and_model_token_limits_pass(self):
        self.write_json({"providers": {"cliproxyapi": {
            "baseUrl": "$CLIPROXYAPI_BASE_URL",
            "apiKey": "$CLIPROXYAPI_API_KEY",
            "models": [{"id": "example", "maxTokens": 32768}],
        }}})
        self.assertEqual(checker.check(self.root), [])

    def test_private_url_is_rejected_without_disclosing_it(self):
        private_url = "https://private-proxy.example/v1"
        self.write_json({"baseUrl": private_url})
        findings = checker.check(self.root)
        self.assertTrue(findings)
        self.assertNotIn(private_url, "\n".join(findings))

    def test_non_url_connection_literals_are_rejected(self):
        for value in ["private-proxy", "!read-private-url", "", None]:
            with self.subTest(value=value):
                self.write_json({"baseUrl": value})
                findings = checker.check(self.root)
                self.assertTrue(findings)
                if value:
                    self.assertNotIn(value, "\n".join(findings))

    def test_literal_credentials_and_commands_are_rejected(self):
        for value in ["private-key-value", "!read-private-key", "", None]:
            with self.subTest(value=value):
                self.write_json({"apiKey": value})
                findings = checker.check(self.root)
                self.assertTrue(findings)
                if value:
                    self.assertNotIn(value, "\n".join(findings))

    def test_nested_header_literals_are_rejected(self):
        self.write_json({"providers": {"example": {"headers": {"X-API-Key": "private-key"}}}})
        self.assertTrue(checker.check(self.root))
        self.write_json({"headers": {"Authorization": "${PROVIDER_AUTH}"}})
        self.assertEqual(checker.check(self.root), [])

    def test_runtime_files_are_rejected_even_without_credentials(self):
        for name in ["auth.json", "cliproxyapi.json", "cliproxyapi-models.json", "models.json.backup-1"]:
            with self.subTest(name=name):
                file = self.root / name
                file.write_text("{}")
                self.assertTrue(checker.check(self.root))
                file.unlink()

    def test_secret_shaped_values_in_source_are_rejected(self):
        file = self.root / "example.ts"
        file.write_text('const credential = "' + "sk-" + "x" * 32 + '";')
        self.assertTrue(checker.check(self.root))

    def test_symlinks_are_rejected(self):
        (self.root / "example.json").symlink_to(self.root / "missing.json")
        self.assertTrue(checker.check(self.root))

    def test_missing_config_is_not_reported_clean(self):
        self.assertTrue(checker.check(self.root / "missing"))


if __name__ == "__main__":
    unittest.main()
