import pathlib
import shutil
import subprocess
import sys
import tempfile
import unittest


SOURCE = pathlib.Path(__file__).resolve().parent.parent


class IndexTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = pathlib.Path(self.temporary.name)
        (self.root / "checks").mkdir()
        for name in ("SKILL.md", "RULES.md", "README.md"):
            shutil.copy2(SOURCE / name, self.root / name)
        for name in ("gen_index.py", "validate.py"):
            shutil.copy2(SOURCE / "checks" / name, self.root / "checks" / name)
        shutil.copytree(SOURCE / "rules", self.root / "rules")

    def run_check(self, name, *args):
        return subprocess.run(
            [sys.executable, str(self.root / "checks" / name), *args],
            capture_output=True,
            text=True,
            check=False,
        )

    def test_regeneration_preserves_router_and_indexes_new_rule(self):
        router = (self.root / "SKILL.md").read_bytes()
        source = self.root / "rules" / "own-borrow-over-clone.md"
        new_rule = source.read_text().replace("own-borrow-over-clone", "own-index-fixture")
        (self.root / "rules" / "own-index-fixture.md").write_text(new_rule)

        stale = self.run_check("gen_index.py", "--check")
        self.assertNotEqual(stale.returncode, 0)
        generated = self.run_check("gen_index.py")
        self.assertEqual(generated.returncode, 0, generated.stdout + generated.stderr)
        self.assertEqual(router, (self.root / "SKILL.md").read_bytes())
        self.assertIn("(rules/own-index-fixture.md)", (self.root / "RULES.md").read_text())

        for name, args in (("gen_index.py", ("--check",)), ("validate.py", ())):
            result = self.run_check(name, *args)
            self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_validator_rejects_unlisted_rule(self):
        catalog = self.root / "RULES.md"
        lines = catalog.read_text().splitlines(keepends=True)
        catalog.write_text("".join(line for line in lines if "(rules/own-borrow-over-clone.md)" not in line))
        result = self.run_check("validate.py")
        self.assertNotEqual(result.returncode, 0)

    def test_regeneration_is_idempotent(self):
        first = self.run_check("gen_index.py")
        self.assertEqual(first.returncode, 0, first.stdout + first.stderr)
        before = {name: (self.root / name).read_bytes() for name in ("SKILL.md", "RULES.md", "README.md")}
        second = self.run_check("gen_index.py")
        self.assertEqual(second.returncode, 0, second.stdout + second.stderr)
        self.assertEqual(before, {name: (self.root / name).read_bytes() for name in before})


if __name__ == "__main__":
    unittest.main()
