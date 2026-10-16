#!/usr/bin/env python3
"""Stage B role check (D13).

Usage: python3 -I check_role_citations.py <repo-root>

Fails when, in any plugins/sunstack-dev/skills/role-*/SKILL.md:
  1. the "## Methods" section contains a principle link;
  2. a `principle-` mention appears outside a markdown link target.
Also lists each role's citations by section.
"""
import glob
import os
import re
import sys

LINK = re.compile(r"\]\([^)\s]*principle-[a-z-]+/SKILL\.md\)")


def main():
    root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
    paths = sorted(glob.glob(os.path.join(root, "plugins/sunstack-dev/skills/role-*/SKILL.md")))
    failures = []
    if len(paths) != 7:
        failures.append(f"[roles] expected 7 role skills, found {len(paths)}")
    for path in paths:
        rel = os.path.relpath(path, root)
        section = None
        counts = {}
        with open(path, encoding="utf-8") as fh:
            for n, line in enumerate(fh.read().split("\n"), 1):
                if line.startswith("## "):
                    section = line[3:].strip()
                links = LINK.findall(line)
                if links:
                    counts[section] = counts.get(section, 0) + len(links)
                    if section == "Methods":
                        failures.append(f"[methods-link] {rel}:{n}: {line.strip()[:160]}")
                if "principle-" in LINK.sub("", line):
                    failures.append(f"[bare-mention] {rel}:{n}: {line.strip()[:160]}")
        print(f"{rel}: " + (", ".join(f"{k}={v}" for k, v in counts.items()) or "no citations"))
    if failures:
        print(f"FAIL ({len(failures)})")
        for f in failures:
            print("  " + f)
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
