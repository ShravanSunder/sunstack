#!/usr/bin/env python3
"""Stage A citation checks for the principle-citation conversion.

Usage: python3 -I check_citations.py <repo-root>

Checks:
  1. every markdown link to .../principle-*/SKILL.md under plugins/ resolves
     from its file, to a principle in the same plugin;
  2. no `load principle-` call (with or without a backtick) remains in plugins/;
  3. no `principle-reading` outside docs/wip/ and changelogs dated before 2026-10-14;
  4. all 17 principles have the read rule as their first body line after the H1;
  5. lists every citation sentence with file:line.
Exit 1 when any check fails.
"""
import os
import re
import subprocess
import sys

READ_RULE = "Read this principle in full before applying it; your own full read earlier this session counts."
LINK = re.compile(r"\]\(([^)\s]*principle-[a-z-]+/SKILL\.md)\)")
LOAD = re.compile(r"load `?principle-")
SENTENCE_SPLIT = re.compile(r"(?<=[.!?])\s+(?=[A-Z\"“])")
DATED_CHANGELOG = re.compile(r"^docs/changelog/(\d{4}-\d{2}-\d{2})-")


def tracked_files(root):
    out = subprocess.run(["git", "-C", root, "ls-files", "-co", "--exclude-standard"],
                         capture_output=True, text=True, check=True).stdout
    return [p for p in out.splitlines() if os.path.isfile(os.path.join(root, p))]


def read_lines(path):
    with open(path, encoding="utf-8") as fh:
        return fh.read().split("\n")


def citation_sentences(line):
    body = re.sub(r"^\s*(?:[-*]|\d+\.)\s+", "", line)
    return [s.strip() for s in SENTENCE_SPLIT.split(body) if LINK.search(s)]


def main():
    root = os.path.abspath(sys.argv[1] if len(sys.argv) > 1 else ".")
    files = tracked_files(root)
    failures = []
    citations = []

    plugin_md = [p for p in files if p.startswith("plugins/") and p.endswith(".md")]
    for rel in plugin_md:
        for n, line in enumerate(read_lines(os.path.join(root, rel)), 1):
            if LOAD.search(line):
                failures.append(f"[load] {rel}:{n}: {line.strip()[:160]}")
            for target in LINK.findall(line):
                resolved = os.path.normpath(os.path.join(root, os.path.dirname(rel), target))
                plugin_dir = os.path.join(root, *rel.split("/")[:2])
                principle_dir = os.path.basename(os.path.dirname(resolved))
                if not os.path.isfile(resolved):
                    failures.append(f"[link] {rel}:{n}: {target} does not resolve")
                elif not resolved.startswith(plugin_dir + os.sep):
                    failures.append(f"[link] {rel}:{n}: {target} leaves plugin {plugin_dir}")
                elif not principle_dir.startswith("principle-"):
                    failures.append(f"[link] {rel}:{n}: {target} is not a principle")
            if LINK.search(line):
                for sentence in citation_sentences(line):
                    citations.append(f"{rel}:{n}: {sentence}")

    for rel in files:
        if rel.startswith("docs/wip/"):
            continue
        m = DATED_CHANGELOG.match(rel)
        if m and m.group(1) < "2026-10-14":
            continue
        try:
            text = open(os.path.join(root, rel), encoding="utf-8").read()
        except (UnicodeDecodeError, IsADirectoryError):
            continue
        for n, line in enumerate(text.split("\n"), 1):
            if "principle-reading" in line:
                failures.append(f"[principle-reading] {rel}:{n}: {line.strip()[:160]}")

    principles = sorted(p for p in files
                   if re.fullmatch(r"plugins/sunstack-dev/skills/principle-[a-z-]+/SKILL\.md", p))
    if len(principles) != 17:
        failures.append(f"[principles] expected 17 principles, found {len(principles)}")
    for rel in principles:
        lines = read_lines(os.path.join(root, rel))
        h1 = next((i for i, l in enumerate(lines) if l.startswith("# ")), None)
        body = next((l for l in lines[h1 + 1:] if l.strip()), None) if h1 is not None else None
        if body != READ_RULE:
            failures.append(f"[read-rule] {rel}: first body line is {body!r}")

    print(f"principles checked: {len(principles)}")
    print(f"citation sentences: {len(citations)}")
    for c in citations:
        print("  " + c)
    if failures:
        print(f"FAIL ({len(failures)})")
        for f in failures:
            print("  " + f)
        return 1
    print("PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
