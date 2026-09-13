---
name: responsive-audit
description: Runs the full audit -> fix -> verify responsiveness pipeline for the portfolio site across viewports from mobile to desktop, using the responsive-auditor/responsive-fixer/responsive-verifier subagents. Use when the user says "/responsive-audit", "check responsiveness", "audit the site for responsive bugs", or wants a viewport-by-viewport QA pass after changes.
argument-hint: "[viewport WxH | all]"
---

# Responsive audit pipeline

Orchestrates `responsive-auditor` -> `responsive-fixer` -> `responsive-verifier` (defined in `.claude/agents/`) across the portfolio's viewport list, small to large. You (the invoking session) are the orchestrator: call each subagent in sequence via the Agent tool with `run_in_background: false` (each step's input depends on the previous step's result), read its report, and branch per the algorithm below. Do not try to parallelize steps within one viewport — audit, fix, and verify are inherently sequential.

## Scope

- No argument, or `all`: run every viewport in the list below, ascending.
- A specific `WxH` argument: run only that viewport (useful for re-checking one size after a manual edit).

## Viewport list (ascending)

```
320x568, 360x800, 375x812, 390x844, 430x932,      # mobile
768x1024, 820x1180, 1024x1366,                    # tablet
1280x720, 1366x768, 1440x900,                     # laptop
1536x864, 1920x1080, 2560x1440                    # desktop
```

Plus, folded into whichever representative viewport is closest above each one, a Tier-1-only scripted check at the breakpoint boundaries: 359/360/361, 639/640/641, 767/768/769, 959/960/961, 1023/1024/1025. The auditor and verifier agents already know to probe further on their own if something looks borderline — you don't need to enumerate every possible width yourself.

## Setup (once per run)

1. Confirm `.claude/launch.json` exists (it should — `portfolio-static-server` running `python3 -m http.server 8000`).
2. Confirm `qa/responsive-audit/ACCEPTANCE_CRITERIA.md` exists; if not, stop and say the pipeline's ground-truth checklist is missing rather than improvising one.

## Loop, per viewport (ascending width)

```
run Agent(responsive-auditor, viewport) -> verdict, issues
if verdict == PASS:
    update SUMMARY.md row to PASS, 0 cycles
    if no baseline screenshot exists for this viewport yet:
        show the auditor's screenshot to the user (SendUserFile) and ask for sign-off
        on approval, save it to qa/responsive-audit/baseline/<w>x<h>.png
    continue to next viewport

cycle = 1
while issues not empty and cycle <= 3:
    run Agent(responsive-fixer, viewport, issues) -> fix_summary
    run Agent(responsive-verifier, viewport, fix_summary, previous_viewport) -> verdict, issues
    cycle += 1

if issues not empty (after 3 cycles):
    update SUMMARY.md row to FAILED-NEEDS-REVIEW, cycles=3, list remaining issues
    tell the user this viewport needs manual review, with the specifics, and continue to the next viewport (don't block the whole run on one stuck viewport)
else:
    update SUMMARY.md row to PASS, cycles used
    if no baseline exists yet for this viewport: same sign-off step as above
```

## Wrap-up

After the loop, report to the user: how many viewports passed outright, how many needed fix cycles (and how many), how many are still FAILED-NEEDS-REVIEW with their specific remaining issues, and point at `qa/responsive-audit/SUMMARY.md` for the full record. Do not declare the run "done" if any viewport is still FAILED-NEEDS-REVIEW — say plainly what's left.

## Notes

- `verification/*.png` is the desktop ground truth (>=1024px); `reference/` (the original design mockups) is never used for comparison by this pipeline.
- The 3-cycle cap exists so one stubborn viewport doesn't loop forever — after 3 rounds, escalate and move on.
- Re-running this skill later (e.g. after adding a new section) reuses existing baselines for regression detection automatically; only genuinely new viewports need a fresh sign-off.
