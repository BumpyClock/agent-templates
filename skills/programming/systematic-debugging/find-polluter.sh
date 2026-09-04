#!/usr/bin/env bash
# Run each matched test file and report whether it creates the target path.
# Exit 0 means no target observed, 1 means target found, and 2 means inconclusive.
# Usage: ./find-polluter.sh <target_path> <test_pattern>

set -euo pipefail

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <target_path> <test_pattern>" >&2
  exit 2
fi

POLLUTION_CHECK="$1"
RAW_TEST_PATTERN="$2"
if [[ "$RAW_TEST_PATTERN" == /* || "$RAW_TEST_PATTERN" == ./* ]]; then
  TEST_PATTERN="$RAW_TEST_PATTERN"
else
  TEST_PATTERN="./$RAW_TEST_PATTERN"
fi

if [ -e "$POLLUTION_CHECK" ] || [ -L "$POLLUTION_CHECK" ]; then
  echo "Inconclusive: target already exists: $POLLUTION_CHECK" >&2
  exit 2
fi

TEST_LIST=$(mktemp)
trap 'rm -f "$TEST_LIST"' EXIT
if ! find . -type f -path "$TEST_PATTERN" -print0 > "$TEST_LIST"; then
  echo "Inconclusive: test discovery failed." >&2
  exit 2
fi

TEST_FILES=()
while IFS= read -r -d '' TEST_FILE; do
  TEST_FILES+=("$TEST_FILE")
done < "$TEST_LIST"
TOTAL=${#TEST_FILES[@]}
if [ "$TOTAL" -eq 0 ]; then
  echo "Inconclusive: no test files match $RAW_TEST_PATTERN" >&2
  exit 2
fi

COUNT=0
for TEST_FILE in "${TEST_FILES[@]}"; do
  if [ -e "$POLLUTION_CHECK" ] || [ -L "$POLLUTION_CHECK" ]; then
    echo "Inconclusive: target exists before test execution: $POLLUTION_CHECK" >&2
    exit 2
  fi

  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] Run: $TEST_FILE"
  if npm test -- "$TEST_FILE"; then
    RUN_STATUS=0
  else
    RUN_STATUS=$?
  fi

  if [ "$RUN_STATUS" -ne 0 ]; then
    echo "Inconclusive: runner exited $RUN_STATUS for $TEST_FILE" >&2
    if [ -e "$POLLUTION_CHECK" ] || [ -L "$POLLUTION_CHECK" ]; then
      echo "Target also appeared during this failed run: $POLLUTION_CHECK" >&2
    fi
    exit 2
  fi

  if [ -e "$POLLUTION_CHECK" ] || [ -L "$POLLUTION_CHECK" ]; then
    echo "Target appeared during $TEST_FILE: $POLLUTION_CHECK"
    exit 1
  fi
done

echo "No target observed after $COUNT successful test-file runs."
exit 0
