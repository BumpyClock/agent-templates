import os
from pathlib import Path
import subprocess
import tempfile
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / "find-polluter.sh"


class FindPolluterTests(unittest.TestCase):
    def test_run_outcomes(self):
        cases = [
            ("existing", True, 2, "target already exists", False),
            ("empty", False, 2, "no test files match", False),
            ("failure", True, 2, "runner exited 7", True),
            ("failure_with_target", True, 2, "Target also appeared", True),
            ("polluter", True, 1, "Target appeared during", True),
            ("clean", True, 0, "1 successful test-file runs", True),
        ]
        for mode, has_test, expected_status, message, ran in cases:
            with self.subTest(mode=mode), tempfile.TemporaryDirectory() as directory:
                root = Path(directory)
                if has_test:
                    (root / "example with spaces.test.js").write_text("")
                if mode == "existing":
                    (root / "unwanted").mkdir()
                binary = root / "bin"
                binary.mkdir()
                npm = binary / "npm"
                npm.write_text('''#!/usr/bin/env bash
printf '%s\\n' "$@" > invocation
printf 'runner diagnostic\\n' >&2
case "$PROBE_MODE" in
  failure) exit 7 ;;
  failure_with_target) touch unwanted; exit 7 ;;
  polluter) touch unwanted ;;
esac
''')
                npm.chmod(0o755)
                result = subprocess.run(
                    ["bash", str(SCRIPT), "unwanted", "*.test.js"],
                    cwd=root,
                    env={**os.environ, "PATH": f"{binary}:{os.environ['PATH']}", "PROBE_MODE": mode},
                    capture_output=True,
                    text=True,
                )
                self.assertEqual(result.returncode, expected_status, result.stderr)
                self.assertIn(message, result.stdout + result.stderr)
                self.assertEqual((root / "invocation").exists(), ran)
                if ran:
                    self.assertEqual(
                        (root / "invocation").read_text().splitlines(),
                        ["test", "--", "./example with spaces.test.js"],
                    )
                    self.assertIn("runner diagnostic", result.stderr)
                if expected_status != 0:
                    self.assertNotIn("No target observed", result.stdout)
                    self.assertNotIn("all tests clean", result.stdout)
                if mode == "existing":
                    self.assertTrue((root / "unwanted").is_dir())


if __name__ == "__main__":
    unittest.main()
