### 1. Classify, and name the promise

IF the request is to judge an existing skill or a draft rather than change it, use `skill-review` and return its verdict instead of continuing here.

MUST load `../domain-skill-crafting/references/change-classes.md` and return the change's class with its claim. What the class causes here: a `mechanical` change gets no design set, so return it to whoever asked with its class and claim, for `skill-creation` to write with static validation; a `behavior-changing` change gets the design set and the design review; a `scoped` change gets the design set and the design review in its scoped form.

For a behavior-changing or scoped change, name the run `create` or `update`. Search the owning plugin or skill folder for an existing skill or reference that already owns the behavior, and return the matching paths or `none`. Name the reusable behavior in one sentence: "This skill helps agents reliably do X when Y happens." State the success definition in the user's own words: the observable behavior and the situation that matter. Name who reaches the skill (an agent unprompted, another skill, a person) and when, and what the change leaves alone. Ask the user when missing meaning would materially change the intended behavior; do not derive the need from the current skill's wording alone.

An invitation like "just quickly fix it" that names neither a success definition nor an authoring basis is not a commission for an `update` run.

Completion: the class and its claim are returned. A mechanical change has gone back to whoever asked, and the run ends. Otherwise the classification, the owning paths or `none`, the baseline (the current skill files and behavior the change starts from, or `none`), the reusable behavior, the success definition, who reaches the skill and when, and the non-goals are named.
