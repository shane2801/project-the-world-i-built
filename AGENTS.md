# Project instructions

Start at [project-context/INDEX.md](project-context/INDEX.md). Load only context relevant to the authorized phase.

- Inspect existing code, tooling and completed work before editing. State scope, affected files, dependencies, acceptance criteria and blockers.
- Follow approved architecture and decisions. Ask before unresolved material architectural changes.
- Preserve original `docs/` contents unless explicitly authorized. Authority: current user decisions, source 10, compatible earlier sources.
- Distinguish facts, inferences, decisions and questions. Cite stable IDs/source sections; verify consequential or uncertain claims against originals.
- Compare source inventory/fingerprints with the index. Review drift before refreshing fingerprints; avoid rereading unchanged unrelated sources.
- Use focused feature modules and explicit typed boundaries; keep bootstrap/composition small. Reuse existing code; justify dependencies and abstractions.
- Comment non-obvious intent, invariants and trade-offs for humans; avoid narrating obvious code.
- Run relevant checks, including `npm run check`; report only executed results and verification limits.
- Update affected context, decisions and graph when approved architecture/interfaces/dependencies change.
- Implement one approved step at a time; leave a coherent testable state and wait for manual review.
- Authorization: commit approved generated artwork; proceed with Phase 6 recovery/quality (DEC-019). Preserve content and hardware gaps. Stop for manual review; no deployment.
