<?php

/**
 * One-off / maintenance: php database/demo/generate-demo-data.php
 * Writes database/demo/demo-data.json
 */

declare(strict_types=1);

$out = __DIR__.'/demo-data.json';

$users = [
    ['name' => 'Yacine', 'email' => 'yacine@zennety.app', 'bio' => 'Default demo account. Full admin on shared orgs; owns a personal org for private tasks.'],
    ['name' => 'Alex Rivera', 'email' => 'alex@zennety.app', 'bio' => 'Product manager focused on roadmap and stakeholder alignment.'],
    ['name' => 'Jordan Lee', 'email' => 'jordan@zennety.app', 'bio' => 'Engineering lead; cares about delivery metrics and team health.'],
    ['name' => 'Sam Patel', 'email' => 'sam@zennety.app', 'bio' => 'DevOps engineer automating everything that repeats twice.'],
    ['name' => 'Casey Murphy', 'email' => 'casey@zennety.app', 'bio' => 'Designer translating research into shippable UI.'],
    ['name' => 'Riley Chen', 'email' => 'riley@zennety.app', 'bio' => 'QA champion; breaks things before users do.'],
    ['name' => 'Morgan Blake', 'email' => 'morgan@zennety.app', 'bio' => 'Technical writer keeping docs honest and findable.'],
    ['name' => 'Taylor Kim', 'email' => 'taylor@zennety.app', 'bio' => 'Data analyst turning logs into decisions.'],
    ['name' => 'Jamie Ortiz', 'email' => 'jamie@zennety.app', 'bio' => 'Support lead triaging tickets and feedback loops.'],
    ['name' => 'Drew Nguyen', 'email' => 'drew@zennety.app', 'bio' => 'Intern learning the stack; owns small vertical slices.'],
];

$teamBookmarkOptions = [
    ['Notion Labs', 'Notion', 'Task Manager'],
    ['Notion Labs', 'Notion AI', 'Research'],
    ['Atlassian', 'Jira', 'Active Sprint'],
    ['Atlassian', 'Confluence', 'Knowledge Base'],
    ['Amazon', 'AWS', 'Deployments'],
    ['Amazon', 'Amazon Store', 'Orders'],
    ['Notion Labs', 'Notion Calendar', 'Weekly Planning'],
    ['Atlassian', 'Bitbucket', 'Pull Requests'],
];

foreach ($users as $i => &$u) {
    $u['bookmarks'] = [];
    for ($b = 0; $b < 3; $b++) {
        $u['bookmarks'][] = $teamBookmarkOptions[($i + $b * 3) % count($teamBookmarkOptions)];
    }
}
unset($u);

$statuses = ['Pending', 'In progress', 'In Review', 'Blocked', 'Done'];
$priorities = ['Normal', 'Medium', 'High', 'Urgent'];

$cardTemplates = [
    'jira_sprint' => ['Refine user story acceptance criteria', 'Estimate backlog items for next sprint', 'Split oversized epic into stories', 'Prioritize tech debt spike', 'Review sprint goal with stakeholders', 'Backlog grooming session prep', 'Dependency map for epic', 'Story point calibration', 'Sprint commitment review', 'Carry-over analysis'],
    'jira_active' => ['Implement OAuth callback handler', 'Fix flaky integration test', 'Pair on API pagination', 'Deploy hotfix to staging', 'Update feature flag defaults', 'Code review queue drain', 'Merge conflict resolution', 'Staging smoke test', 'Performance regression check', 'Release notes draft'],
    'jira_bug' => ['Investigate 500 on board export', 'Reproduce Safari layout glitch', 'Patch null deref in notifications', 'Add logging for webhook failures', 'Verify regression on mobile', 'Sentry error triage batch', 'Customer repro steps doc', 'Hotfix branch creation', 'QA sign-off blocked items', 'Post-fix monitoring window'],
    'jira_reports' => ['Burndown chart for sprint 12', 'Velocity trend last 6 sprints', 'Cycle time by team', 'Open vs closed bugs quarterly', 'Lead time distribution', 'Throughput by assignee', 'Aging WIP report', 'Escaped defects review', 'Forecast accuracy check', 'Stakeholder metrics pack'],
    'jira_features' => ['Dark mode for board view', 'Bulk move cards across statuses', 'Mention users in comments', 'Saved filter presets', 'Keyboard shortcuts cheatsheet', 'Inline file previews', 'Board templates library', 'Audit log export', 'Role matrix documentation', 'Beta feature toggle UI'],
    'conf_kb' => ['How we run incidents', 'On-call rotation policy', 'Architecture decision records index', 'New hire engineering checklist', 'API versioning guidelines', 'Runbook template standard', 'Security baseline checklist', 'Data retention policy summary', 'Vendor access procedure', 'Post-incident review archive'],
    'conf_docs' => ['REST API reference draft', 'Mobile release process', 'Database migration playbook', 'Security review template', 'Performance benchmarking guide', 'SDK usage examples', 'Error code catalog', 'Localization workflow', 'Accessibility audit steps', 'Deprecation notice template'],
    'conf_teams' => ['Marketing workspace structure', 'Sales pipeline glossary', 'Legal review workflow', 'Finance approval matrix', 'Support tier definitions', 'Partner onboarding outline', 'Brand asset usage rules', 'Contract storage convention', 'Meeting cadence by function', 'Cross-functional RACI'],
    'conf_drafts' => ['Q2 blog post outline', 'Partner announcement copy', 'Help center article invites', 'Internal newsletter draft', 'Press release v2 edits', 'Landing page hero variants', 'Case study interview questions', 'Webinar abstract submission', 'Social thread draft', 'Product changelog wording'],
    'trello_personal' => ['Book dentist', 'Review conference talks', 'Prepare 1:1 notes', 'Renew domain DNS', 'Expense report submission', 'Update resume section', 'Gift ideas list', 'Reading list backlog', 'Home maintenance item', 'Tax document folder'],
    'trello_team' => ['Design critique Thursday', 'Sprint retro action items', 'Shared OKR tracking', 'Cross-team dependency list', 'Shared design file links', 'Team norms refresh', 'Offsite planning tasks', 'Swag order coordination', 'Team survey follow-ups', 'Lunch and learn topic vote'],
    'trello_planning' => ['Roadmap assumptions doc', 'Capacity plan next month', 'Risk register update', 'Quarterly theme proposal', 'Scenario planning notes', 'Budget headroom check', 'Hiring plan alignment', 'Technical debt budget', 'Customer commitment dates', 'Launch readiness gates'],
    'trello_goals' => ['Ship MVP analytics', 'Reduce P95 latency 20%', 'Improve NPS by 5 points', 'Hire second backend engineer', 'Expand to second region', 'Cut support backlog 30%', 'Automate onboarding emails', 'Raise test coverage target', 'Ship mobile offline mode', 'Certify SOC2 readiness'],
    'bb_prs' => ['feat: board filters', 'fix: invitation email link', 'chore: bump Laravel patch', 'docs: demo reset endpoint', 'test: membership policy', 'refactor: DTO constructors', 'perf: eager load boards', 'style: pint formatting pass', 'ci: split test jobs', 'security: dependency bump batch'],
    'bb_repos' => ['zennety api branch protection', 'zennety www Storybook setup', 'Archive legacy prototype repo', 'Mirror to backup remote', 'Submodule pin update', 'License file normalization', 'CODEOWNERS refresh', 'Issue templates triage', 'Release tagging convention', 'Readme install steps'],
    'bb_cicd' => ['Add PHPStan to pipeline', 'Cache composer dependencies', 'Parallelize frontend tests', 'Notify Slack on deploy failure', 'Artifact retention policy', 'Staging deploy smoke', 'Rollback automation test', 'Secrets rotation checklist', 'Build time regression alert', 'Coverage gate threshold'],
    'bb_issues' => ['Document demo seed process', 'Flaky test in CardObserver', 'Upgrade Spatie permission', 'SQLite vs MySQL parity', 'OpenAPI spec drift', 'Rate limit header docs', 'Webhook retry policy', 'Log noise reduction', 'Memory leak investigation', 'Timeout tuning production'],
    'notion_tasks' => ['Weekly triage inbox', 'Follow up vendor contract', 'Prep board demo script', 'Clean duplicate labels', 'Archive done projects', 'Recurring checklist template', 'Waiting on reply list', 'Delegated items review', 'Snooze items revisit', 'Personal productivity audit'],
    'notion_projects' => ['Website relaunch timeline', 'Mobile app beta milestones', 'Infra cost review initiative', 'Customer research synthesis', 'Integration partner rollout', 'Pricing experiment design', 'Success metrics dashboard', 'Risk mitigation owners', 'Steering committee deck', 'Go-live communication plan'],
    'notion_notes' => ['Meeting notes planning', 'Interview debrief PM role', 'Workshop output prioritization', 'RFC realtime updates', 'Decision log January', 'Competitive takeaways', 'User interview quotes', 'Architecture sketch notes', 'Open questions backlog', 'Assumption validation list'],
    'notion_calendar' => ['March content themes', 'Webinar promotion dates', 'Newsletter send schedule', 'Social repost calendar', 'Launch week checklist', 'Editorial calendar gaps', 'Campaign UTM plan', 'Speaker rehearsal slots', 'Asset due dates', 'Cross-post approval queue'],
    'notion_goals' => ['ARR target assumptions', 'North star metric definition', 'Team growth plan', 'Quality bar for releases', 'Reduce churn in SMB', 'Self-serve activation rate', 'Support cost per account', 'Product margin targets', 'Innovation time allocation', 'Customer success milestones'],
    'nai_gen' => ['Draft release notes tone', 'Summarize user feedback themes', 'Generate FAQ from tickets', 'Rewrite error messages humanely', 'Blog outline from bullets', 'Email subject line variants', 'In-app tooltip copy pass', 'Changelog customer facing', 'Help article first draft', 'Slack announcement polish'],
    'nai_sum' => ['Executive summary of Q1', 'Condense 40-page spec', 'TLDR for legal review', 'Customer call highlights', 'Meeting minutes action items', 'Research paper abstract', 'Incident timeline summary', 'Quarterly board brief', 'Training video script outline', 'Policy diff summary'],
    'nai_brain' => ['Ideas for onboarding tour', 'Name candidates for feature', 'Icebreakers for retro', 'Partnership angles', 'Pricing model brainstorm', 'Event theme ideas', 'Blog series topics', 'Community program names', 'Beta cohort naming', 'Hackathon project seeds'],
    'nai_research' => ['Competitor pricing matrix', 'LLM eval methodology notes', 'Citation list for blog', 'Survey question draft', 'Literature review outline', 'Dataset licensing comparison', 'Benchmark run protocol', 'Interview guide v2', 'Hypothesis backlog', 'Results interpretation notes'],
    'ncal_week' => ['Block focus time Tue Thu', '1:1s round', 'Prep sprint planning', 'Customer calls Wed', 'Deep work Wednesday AM', 'Email batch Friday PM', 'Review calendar conflicts', 'Travel buffer blocks', 'Prep for exec sync', 'Weekly review checklist'],
    'ncal_events' => ['Company all-hands', 'Product launch livestream', 'Meetup sponsorship booth', 'Board meeting prep', 'Customer advisory session', 'Industry conference booth', 'Webinar host dry run', 'Team celebration planning', 'Press briefing slot', 'Partner summit day two'],
    'ncal_deadlines' => ['Tax filing internal', 'Contract renewal legal', 'Certification audit window', 'Budget lock date', 'Feature freeze cutoff', 'Insurance renewal forms', 'Patent filing reminder', 'Vendor payment terms', 'Compliance attestation', 'Renewal pricing deadline'],
    'ncal_milestones' => ['Beta feature freeze', 'GA release candidate', 'Post-mortem published', 'Handoff to support', 'Design complete milestone', 'Security review gate', 'Localization freeze', 'App store submission', 'Marketing site switch', 'Success playbook v1'],
    'nt_hr' => ['Open roles intake form', 'Benefits enrollment reminders', 'Performance review calibration', 'Promotion packet templates', 'Visa renewal tracking', 'Headcount planning sheet', 'Interview panel training', 'Offer approval chain', 'Offboarding checklist', 'HRIS data cleanup'],
    'nt_comms' => ['Weekly changelog email', 'CEO Friday note outline', 'All-hands slide deck', 'Slack etiquette refresh', 'Internal wiki migration', 'Town hall Q and A prep', 'Crisis comms holding statement', 'Employee spotlight draft', 'Policy update announcement', 'Newsletter sponsorship copy'],
    'nt_onboard' => ['Laptop provisioning checklist', 'Day-30 survey', 'Buddy program matches', 'Access audit for new hires', 'First week agenda template', 'IT setup verification', 'Manager 30-60-90', 'Role expectations doc', 'Org chart walkthrough', 'Tools access matrix'],
    'nt_perf' => ['Team velocity dashboard', 'Individual growth plans', 'Quarterly review cycle', '360 feedback schedule', 'Goal attainment rollup', 'Promotion readiness tracker', 'Skills gap analysis', 'Coaching session notes', 'PIP checkpoint dates', 'Calibration meeting prep'],
    'amz_orders' => ['Investigate delayed Prime order', 'Bulk export for accounting', 'Refund edge case 44821', 'Seller message SLA breach', 'Order split shipment fix', 'Gift wrap exception', 'Address validation failure', 'Fraud review queue', 'Replacement order auth', 'Invoice mismatch research'],
    'amz_ship' => ['Carrier pickup missed window', 'Relabel international parcel', 'Update tracking webhook', 'Warehouse slot optimization trial', 'Late shipment root cause', 'Packaging spec update', 'Cold chain variance', 'Dock appointment reschedule', 'Manifest reconciliation', 'Shipping insurance claim'],
    'amz_returns' => ['Approve damaged goods claim', 'Restock sellable returns', 'Policy exception for VIP', 'Return reason taxonomy update', 'Warehouse disposition batch', 'Refund timing audit', 'Customer photo verification', 'Vendor chargeback prep', 'Restocking fee waiver review', 'Liquidation batch approval'],
    'amz_listings' => ['Fix suppressed ASIN copy', 'A plus content refresh batch', 'Keyword research for SKU-12', 'Compliance image requirements', 'Variation relationship fix', 'Browse node correction', 'Brand registry dispute', 'Bullet point A B test', 'Inventory feed error', 'Category approval pending'],
    'amz_reviews' => ['Respond to 1-star battery issue', 'Report abuse pattern', 'Aggregate feature requests', 'Sample reviews for training', 'Review solicitation policy', 'Translation of top reviews', 'Fake review escalation', 'Star rating drift analysis', 'Response template update', 'Product team digest weekly'],
    'amz_sales' => ['Daily revenue flash', 'Category mix week over week', 'Promo uplift analysis', 'Forecast vs actual March', 'Basket size trend', 'Regional sales split', 'Return rate by category', 'Lightning deal post-mortem', 'Subscription attach rate', 'Margin by SKU cohort'],
    'aws_ec2' => ['Resize staging instances', 'Patch AMIs this weekend', 'Tag enforcement cleanup', 'Spot interruption playbook', 'Cost allocation by team', 'Reserved instance coverage', 'Instance type right-sizing', 'IMDSv2 enforcement sweep', 'Key pair rotation', 'Auto scaling policy tune'],
    'aws_s3' => ['Lifecycle policy for logs bucket', 'Enable versioning on uploads', 'Audit public bucket ACLs', 'Restore deleted object test', 'Intelligent tiering review', 'Replication lag check', 'Inventory manifest job', 'Glacier retrieval test', 'Bucket policy least privilege', 'Multipart upload cleanup'],
    'aws_iam' => ['Rotate service account keys', 'Least privilege pass on lambdas', 'MFA enforcement report', 'Break glass access procedure', 'Permission boundary audit', 'Cross account role review', 'IAM Access Analyzer findings', 'Unused credential report', 'SCP exception documentation', 'Federation metadata refresh'],
    'aws_mon' => ['Tune noisy CloudWatch alarm', 'Dashboard for API latency', 'Synthetic check for checkout', 'On-call runbook update', 'Log insight query library', 'Metric anomaly investigation', 'Pager fatigue review', 'SLO burn rate alert', 'Trace sampling adjustment', 'Dashboard drill workshop'],
    'aws_deploy' => ['Blue green for API service', 'Rollback drill documented', 'Terraform state lock incident', 'Canary metrics gate', 'Deployment window blackout', 'Feature flag kill switch test', 'Database migration dry run', 'Smoke test after deploy', 'Artifact signing verification', 'Post deploy health dashboard'],
    'pv_prod' => ['Episode 3 color grade', 'Subtitle QC region EU', 'Music licensing clearance', 'Behind the scenes short', 'ADR mix review', 'VFX shot turnaround', 'Dubbing script lock', 'Compliance edits round', 'Master delivery spec', 'Credits roll verification'],
    'pv_release' => ['Regional premiere dates', 'Trailer drop coordination', 'Press embargo list', 'Metadata schema v2', 'Rating board submission', 'Localization batch two', 'App store assets pack', 'Partner co-marketing slots', 'Homepage takeover timing', 'Subscriber email blast'],
    'pv_originals' => ['Writers room season arc', 'Casting callbacks week 2', 'Location scout budget', 'VFX shot list review', 'Table read scheduling', 'Showrunner notes incorporation', 'Pilot reshoot list', 'Music supervisor brief', 'Legal clearance titles', 'Marketing sizzle cut'],
    'pv_viewer' => ['Completion rate experiment', 'Churn cohort analysis', 'Recommendation cold start fix', 'Kids profile engagement', 'Bitrate ladder experiment', 'Search relevance tuning', 'Continue watching bug', 'Subtitle off rate by locale', 'Signup funnel drop-off', 'Win back campaign metrics'],
    'am_playlists' => ['Summer focus playlist refresh', 'Genre merge duplicates', 'Editorial pitch for Monday', 'User generated collab rules', 'Mood playlist QA pass', 'Cover art consistency', 'Track availability check', 'Regional rights conflict', 'Playlist SEO keywords', 'Collaborative list moderation'],
    'am_artists' => ['Profile image updates batch', 'Verify royalty splits', 'Tour date ingestion', 'Merch link verification', 'Bio translation queue', 'Similar artists tuning', 'Claim dispute resolution', 'Social link validation', 'Featured placement pitch', 'Discography gap fill'],
    'am_new' => ['Friday drops newsletter', 'Label delivery pipeline', 'Explicit flag audit', 'Preview clip generation', 'Release timezone rollout', 'Pre-save campaign setup', 'Chart eligibility check', 'Radio edit submission', 'Streaming link QA', 'New release internal memo'],
    'am_stream' => ['Hourly plays dashboard', 'Skip rate by device', 'Premium conversion funnel', 'Geo blackout check', 'Session length cohorts', 'Offline plays reconciliation', 'Ad supported fill rate', 'Family plan usage', 'Voice assistant plays', 'Car mode engagement'],
    'am_log_del' => ['Same day delivery SLA dip', 'Last mile partner escalation', 'Proof of delivery photos', 'Customer apology credits', 'Route density analysis', 'Failed attempt callback', 'Locker capacity alert', 'Weather delay messaging', 'Driver incentive adjustment', 'Peak day staffing model'],
    'am_log_route' => ['Rebalance Sunday routes', 'Traffic pattern ML features', 'Driver app crash spike', 'Fuel surcharge update', 'Geofence accuracy audit', 'Time window promise tune', 'Batching optimization trial', 'Return to station routing', 'Customer preferred window', 'Rural route time study'],
    'am_log_wh' => ['Inbound dock backlog', 'Cycle count zone B', 'Robotics maintenance window', 'Safety audit follow ups', 'Slotting optimization wave', 'Damaged pallet disposition', 'Cross dock staging rules', 'Temp controlled zone check', 'Labor planning Sunday surge', 'Inventory accuracy blitz'],
    'am_log_issues' => ['Damaged shipment root cause', 'Address geocode failures', 'Weather delay comms template', 'Insurance claim batch', 'Lost package investigation', 'Carrier claim dispute', 'Customer proof request', 'Repeat failure address flag', 'Packaging defect supplier', 'Delivery exception coding'],
    'am_log_perf' => ['Drops per hour benchmark', 'Picker accuracy leaderboard', 'Truck utilization report', 'Customer promise hit rate', 'Cost per package trend', 'First attempt success rate', 'Returns processing time', 'Warehouse productivity index', 'On time departure metric', 'Damage rate by FC'],
    'personal_inbox' => ['Follow up on email thread', 'Schedule dentist appointment', 'Review subscription renewals', 'Organize desktop downloads', 'Backup phone photos', 'Update passwords vault', 'Plan weekend errands', 'Read saved article', 'Call bank about charge', 'Water plants reminder', 'Sort receipts folder', 'Renew software license', 'Book car service', 'Gift idea for friend', 'Review insurance policy', 'Clean inbox filters', 'Prepare grocery list', 'Check credit report', 'Update emergency contacts', 'Review calendar next week', 'Declutter one drawer', 'Research weekend trip', 'Fix home WiFi issue', 'Archive old projects', 'Reply to pending invites'],
];

$workspaceDescriptions = [
    'Jira' => 'Agile delivery hub for epics, sprints, and engineering execution tracking.',
    'Confluence' => 'Structured knowledge and documentation aligned to teams and programs.',
    'Trello' => 'Lightweight lists for personal and team coordination outside formal sprints.',
    'Bitbucket' => 'Source control, review, and delivery automation for the product codebase.',
    'Notion' => 'Core product planning surface for tasks, projects, and documentation.',
    'Notion AI' => 'Generative workflows for drafting, summarization, and structured research.',
    'Notion Calendar' => 'Time-based planning for people, milestones, and recurring commitments.',
    'Notion Teams' => 'People operations, communications, and performance rituals in one place.',
    'Amazon Store' => 'End-to-end retail operations from catalog to post-purchase support.',
    'AWS' => 'Cloud infrastructure lifecycle including compute, storage, identity, and observability.',
    'Prime Video' => 'Content lifecycle from production through distribution and audience insight.',
    'Amazon Music' => 'Catalog, editorial, and streaming performance for music products.',
    'Amazon Logistics' => 'Physical delivery network covering routes, sites, and service quality.',
    'Personal' => 'Private capture and planning for a single member outside shared company boards.',
];

$boardDescriptions = [
    'Sprint Backlog' => 'Upcoming work candidates prioritized for the next iteration.',
    'Active Sprint' => 'Committed work in progress for the current timeboxed sprint.',
    'Bug Tracking' => 'Defect intake, reproduction, and resolution across environments.',
    'Reports' => 'Delivery and quality metrics for stakeholders and retrospectives.',
    'Feature Requests' => 'Inbound product ideas evaluated for roadmap consideration.',
    'Knowledge Base' => 'Canonical answers and policies discoverable by the whole org.',
    'Documentation' => 'Technical and process docs maintained alongside shipping code.',
    'Team Spaces' => 'Departmental hubs for rituals, links, and shared context.',
    'Content Drafts' => 'Work-in-progress writing before publication or handoff.',
    'Personal Tasks' => 'Individual todos that do not belong to a shared program.',
    'Team Boards' => 'Shared team rituals, links, and lightweight coordination.',
    'Planning' => 'Horizon planning for capacity, risks, and quarterly outcomes.',
    'Goals Tracking' => 'Measurable objectives and checkpoints for the group.',
    'Pull Requests' => 'Code review and merge queue for application changes.',
    'Repositories' => 'Repository hygiene, ownership, and archival decisions.',
    'CI/CD Pipelines' => 'Build, test, and deployment automation health and changes.',
    'Issues' => 'Engineering backlog outside the main agile board taxonomy.',
    'Task Manager' => 'Day-to-day tasks and follow-ups for product and operations.',
    'Project Tracker' => 'Milestone-oriented view across active initiatives.',
    'Notes and Docs' => 'Unstructured notes, meeting output, and living documents.',
    'Content Calendar' => 'Editorial timing for launches, campaigns, and comms.',
    'Goals' => 'North-star alignment and measurable outcomes for the quarter.',
    'Content Generation' => 'Drafts and variants produced with assisted writing.',
    'Summaries' => 'Condensed reads of long materials for faster decisions.',
    'Brainstorming' => 'Exploratory lists before commitments or specs.',
    'Research' => 'Structured inquiry with sources and open questions.',
    'Weekly Planning' => 'Recurring weekly structure for focus and commitments.',
    'Events' => 'One-off and recurring events with owners and prep tasks.',
    'Deadlines' => 'Hard dates with dependencies and escalation paths.',
    'Milestones' => 'Program checkpoints that gate broader releases.',
    'HR Tasks' => 'People programs, compliance, and lifecycle administration.',
    'Internal Communications' => 'All-staff messaging and rhythm of business.',
    'Onboarding' => 'New hire experience from access to first outcomes.',
    'Team Performance' => 'Goals, feedback cycles, and team health indicators.',
    'Orders' => 'Purchase flow issues, exceptions, and fulfillment coordination.',
    'Shipping' => 'Carrier operations, labels, and delivery promises.',
    'Returns' => 'Reverse logistics, refunds, and inventory disposition.',
    'Product Listings' => 'Catalog content, compliance, and discoverability.',
    'Reviews' => 'Customer voice, moderation, and product feedback loops.',
    'Sales Analytics' => 'Revenue, mix, and promotional effectiveness.',
    'EC2 Instances' => 'Virtual machine fleet sizing, patching, and cost.',
    'S3 Storage' => 'Object storage lifecycle, access patterns, and governance.',
    'IAM and Security' => 'Identity, permissions, and least-privilege posture.',
    'Monitoring' => 'Metrics, logs, traces, and alerting for production.',
    'Deployments' => 'Release mechanics, rollback readiness, and verification.',
    'Content Production' => 'Creative production steps from script to masters.',
    'Release Schedule' => 'Market and platform timing for titles and campaigns.',
    'Originals' => 'Owned programming development and greenlight decisions.',
    'Viewer Analytics' => 'Engagement, retention, and experimentation readouts.',
    'Playlists' => 'Editorial lists, curation rules, and merchandising.',
    'Artists' => 'Artist profiles, rights, and merchandising links.',
    'New Releases' => 'Friday drops and label coordination.',
    'Streaming Statistics' => 'Consumption patterns across surfaces and cohorts.',
    'Deliveries' => 'Last-mile execution and customer-visible delivery status.',
    'Route Planning' => 'Route design, density, and constraint solving.',
    'Warehouses' => 'Inbound, storage, picking, and site operations.',
    'Delivery Issues' => 'Exceptions, claims, and corrective actions.',
    'Performance' => 'Network-level productivity and customer promise metrics.',
    'Inbox' => 'Unsorted personal items before they are filed into other lists.',
    'Ideas pool' => 'Unstructured ideas captured before prioritization or sizing.',
    'Backlog intake' => 'Incoming items waiting for refinement and acceptance criteria.',
    'Parked work' => 'Deferred items kept visible but not active in the current cycle.',
    'Review queue' => 'Items waiting on peer or stakeholder review before completion.',
    'Triage hold' => 'Short-term holding area for classification and routing decisions.',
    'Parking lot' => 'Topics parked for future discussion or a later planning session.',
    'Side quests' => 'Small improvements and opportunistic work outside the main track.',
    'Next cycle' => 'Candidates earmarked for an upcoming planning or sprint window.',
];

$cardTemplates['generic_pool'] = [
    'Clarify scope with stakeholder', 'Document open questions', 'Schedule alignment meeting', 'Draft one-pager summary',
    'Validate assumption with data', 'Capture decision in wiki', 'Follow up on blocked dependency', 'Prepare demo script',
    'Review acceptance criteria', 'Estimate remaining effort', 'Sync with partner team', 'Update project timeline',
    'Clean up stale tickets', 'Archive completed initiative', 'Refresh roadmap slide', 'Check license compliance',
    'Improve error messaging', 'Add monitoring alert', 'Reduce log verbosity', 'Profile slow endpoint',
    'Write runbook section', 'On-call handoff notes', 'Customer success check-in', 'Sales enablement snippet',
    'Localization string export', 'Accessibility spot check', 'Security patch verification', 'Backup restore drill',
];

$cardTemplates['generic_review'] = [
    'Peer review round one', 'Stakeholder sign-off pending', 'Legal pass on copy', 'Design critique follow-up',
    'Technical feasibility check', 'Budget re-check', 'Risk reassessment', 'Go-no-go checklist item',
    'Final QA sweep', 'Release notes wording', 'Support briefing doc', 'Metrics dashboard review',
];

/**
 * @param  list<array{name: string, key: string}>  $boardDefs
 * @return list<array{name: string, key: string}>
 */
function normalizeWorkspaceBoards(array $boardDefs, string $orgName, string $wsName): array
{
    $target = 5 + (crc32($orgName.'|'.$wsName) % 5);
    $boardDefs = array_values($boardDefs);
    $n = count($boardDefs);
    if ($n > $target) {
        return array_slice($boardDefs, 0, $target);
    }

    $fillerMeta = [
        ['Ideas pool', 'generic_pool'],
        ['Backlog intake', 'generic_pool'],
        ['Parked work', 'generic_pool'],
        ['Review queue', 'generic_review'],
        ['Triage hold', 'generic_pool'],
        ['Parking lot', 'generic_pool'],
        ['Side quests', 'generic_pool'],
        ['Next cycle', 'generic_review'],
    ];
    $i = 0;
    while (count($boardDefs) < $target) {
        [$label, $key] = $fillerMeta[$i % count($fillerMeta)];
        $name = $label.' ('.(count($boardDefs) + 1).')';
        $boardDefs[] = ['name' => $name, 'key' => $key];
        $i++;
    }

    return $boardDefs;
}

/**
 * @return list<array{status: string, title: string, assigneeEmail: string, priority: string, deadline?: string}>
 */
function buildCardsForBoard(
    string $templateKey,
    string $orgName,
    string $wsName,
    string $boardName,
    array $others,
    int $boardIndex,
    array $statuses,
    array $priorities,
    array $cardTemplates
): array {
    $bases = $cardTemplates[$templateKey] ?? ['Task item'];
    $h = crc32($orgName.'|'.$wsName.'|'.$boardName);
    $total = 15 + ($h % 6);

    $weights = [];
    foreach ($statuses as $s) {
        $weights[$s] = 1 + (crc32($boardName.'|'.$s.'|'.$h) % 10);
    }
    $wsum = array_sum($weights);
    $counts = [];
    foreach ($statuses as $s) {
        $counts[$s] = max(1, (int) floor($total * $weights[$s] / $wsum));
    }

    $diff = $total - array_sum($counts);
    $si = 0;
    $guard = 0;
    while ($diff !== 0 && $guard < 500) {
        $s = $statuses[$si % count($statuses)];
        if ($diff > 0) {
            $counts[$s]++;
            $diff--;
        } elseif ($counts[$s] > 1) {
            $counts[$s]--;
            $diff++;
        }
        $si++;
        $guard++;
    }

    $cards = [];
    $ci = 0;
    foreach ($statuses as $statusName) {
        for ($k = 0; $k < $counts[$statusName]; $k++) {
            $wave = intdiv($ci, count($bases));
            $base = $bases[$ci % count($bases)];
            $title = $wave === 0 ? $base : $base.' (follow-up '.$wave.')';
            $row = [
                'status' => $statusName,
                'title' => $title,
                'assigneeEmail' => $others[($h + $ci + $boardIndex) % count($others)],
                'priority' => $priorities[($h + $ci) % count($priorities)],
            ];
            // ~40% of cards get a deadline (deterministic; not every card).
            if ((($h + $ci * 17 + $boardIndex * 3) % 5) < 2) {
                $offsetDays = 1 + (($h + $ci * 19 + $boardIndex * 7) % 120);
                $row['deadline'] = (new DateTimeImmutable('2026-01-01 UTC'))
                    ->modify("+{$offsetDays} days")
                    ->setTime(17, 0)
                    ->format('Y-m-d H:i:s');
            }
            $cards[] = $row;
            $ci++;
        }
    }

    return $cards;
}

$orgDefs = [
    ['name' => 'Atlassian', 'description' => 'Collaboration suite demo covering agile delivery, knowledge, lightweight lists, and developer workflows.', 'workspaces' => [
        ['name' => 'Jira', 'boards' => [
            ['name' => 'Sprint Backlog', 'key' => 'jira_sprint'],
            ['name' => 'Active Sprint', 'key' => 'jira_active'],
            ['name' => 'Bug Tracking', 'key' => 'jira_bug'],
            ['name' => 'Reports', 'key' => 'jira_reports'],
            ['name' => 'Feature Requests', 'key' => 'jira_features'],
        ]],
        ['name' => 'Confluence', 'boards' => [
            ['name' => 'Knowledge Base', 'key' => 'conf_kb'],
            ['name' => 'Documentation', 'key' => 'conf_docs'],
            ['name' => 'Team Spaces', 'key' => 'conf_teams'],
            ['name' => 'Content Drafts', 'key' => 'conf_drafts'],
        ]],
        ['name' => 'Trello', 'boards' => [
            ['name' => 'Personal Tasks', 'key' => 'trello_personal'],
            ['name' => 'Team Boards', 'key' => 'trello_team'],
            ['name' => 'Planning', 'key' => 'trello_planning'],
            ['name' => 'Goals Tracking', 'key' => 'trello_goals'],
        ]],
        ['name' => 'Bitbucket', 'boards' => [
            ['name' => 'Pull Requests', 'key' => 'bb_prs'],
            ['name' => 'Repositories', 'key' => 'bb_repos'],
            ['name' => 'CI/CD Pipelines', 'key' => 'bb_cicd'],
            ['name' => 'Issues', 'key' => 'bb_issues'],
        ]],
    ]],
    ['name' => 'Amazon', 'description' => 'Operations demo spanning ecommerce storefront, cloud, media, music, and logistics networks.', 'workspaces' => [
        ['name' => 'Amazon Store', 'boards' => [
            ['name' => 'Orders', 'key' => 'amz_orders'],
            ['name' => 'Shipping', 'key' => 'amz_ship'],
            ['name' => 'Returns', 'key' => 'amz_returns'],
            ['name' => 'Product Listings', 'key' => 'amz_listings'],
            ['name' => 'Reviews', 'key' => 'amz_reviews'],
            ['name' => 'Sales Analytics', 'key' => 'amz_sales'],
        ]],
        ['name' => 'AWS', 'boards' => [
            ['name' => 'EC2 Instances', 'key' => 'aws_ec2'],
            ['name' => 'S3 Storage', 'key' => 'aws_s3'],
            ['name' => 'IAM and Security', 'key' => 'aws_iam'],
            ['name' => 'Monitoring', 'key' => 'aws_mon'],
            ['name' => 'Deployments', 'key' => 'aws_deploy'],
        ]],
        ['name' => 'Prime Video', 'boards' => [
            ['name' => 'Content Production', 'key' => 'pv_prod'],
            ['name' => 'Release Schedule', 'key' => 'pv_release'],
            ['name' => 'Originals', 'key' => 'pv_originals'],
            ['name' => 'Viewer Analytics', 'key' => 'pv_viewer'],
        ]],
        ['name' => 'Amazon Music', 'boards' => [
            ['name' => 'Playlists', 'key' => 'am_playlists'],
            ['name' => 'Artists', 'key' => 'am_artists'],
            ['name' => 'New Releases', 'key' => 'am_new'],
            ['name' => 'Streaming Statistics', 'key' => 'am_stream'],
        ]],
        ['name' => 'Amazon Logistics', 'boards' => [
            ['name' => 'Deliveries', 'key' => 'am_log_del'],
            ['name' => 'Route Planning', 'key' => 'am_log_route'],
            ['name' => 'Warehouses', 'key' => 'am_log_wh'],
            ['name' => 'Delivery Issues', 'key' => 'am_log_issues'],
            ['name' => 'Performance', 'key' => 'am_log_perf'],
        ]],
    ]],
    ['name' => 'Notion Labs', 'description' => 'Product company demo: Notion, Notion AI, Calendar, and Teams style workspaces for planning and people ops.', 'workspaces' => [
        ['name' => 'Notion', 'boards' => [
            ['name' => 'Task Manager', 'key' => 'notion_tasks'],
            ['name' => 'Project Tracker', 'key' => 'notion_projects'],
            ['name' => 'Notes and Docs', 'key' => 'notion_notes'],
            ['name' => 'Content Calendar', 'key' => 'notion_calendar'],
            ['name' => 'Goals', 'key' => 'notion_goals'],
        ]],
        ['name' => 'Notion AI', 'boards' => [
            ['name' => 'Content Generation', 'key' => 'nai_gen'],
            ['name' => 'Summaries', 'key' => 'nai_sum'],
            ['name' => 'Brainstorming', 'key' => 'nai_brain'],
            ['name' => 'Research', 'key' => 'nai_research'],
        ]],
        ['name' => 'Notion Calendar', 'boards' => [
            ['name' => 'Weekly Planning', 'key' => 'ncal_week'],
            ['name' => 'Events', 'key' => 'ncal_events'],
            ['name' => 'Deadlines', 'key' => 'ncal_deadlines'],
            ['name' => 'Milestones', 'key' => 'ncal_milestones'],
        ]],
        ['name' => 'Notion Teams', 'boards' => [
            ['name' => 'HR Tasks', 'key' => 'nt_hr'],
            ['name' => 'Internal Communications', 'key' => 'nt_comms'],
            ['name' => 'Onboarding', 'key' => 'nt_onboard'],
            ['name' => 'Team Performance', 'key' => 'nt_perf'],
        ]],
    ]],
];

$emails = array_column($users, 'email');
$yacine = 'yacine@zennety.app';
$others = array_values(array_filter($emails, fn ($e) => $e !== $yacine));

/**
 * Workspace owner emails for shared demo orgs. Notion Labs: Yacine owns three product workspaces; one other user owns Notion Teams.
 *
 * @param  list<string>  $allEmails
 */
function resolveWorkspaceOwnerEmail(string $orgName, string $wsName, int $sharedWorkspaceIndex, array $allEmails): string
{
    $map = [
        'Notion Labs' => [
            'Notion' => 'yacine@zennety.app',
            'Notion AI' => 'yacine@zennety.app',
            'Notion Calendar' => 'yacine@zennety.app',
            'Notion Teams' => 'alex@zennety.app',
        ],
        'Atlassian' => [
            'Jira' => 'yacine@zennety.app',
            'Confluence' => 'yacine@zennety.app',
            'Trello' => 'jordan@zennety.app',
            'Bitbucket' => 'sam@zennety.app',
        ],
    ];
    if (isset($map[$orgName][$wsName])) {
        return $map[$orgName][$wsName];
    }
    if ($orgName === 'Amazon') {
        return $allEmails[$sharedWorkspaceIndex % count($allEmails)];
    }

    return $allEmails[0];
}

/**
 * Full workspace membership for the fixture (mirrors DemoDataSeeder rules).
 *
 * @param  list<array{name: string, email: string}>  $userRows
 * @return list<array{email: string, role: string}>
 */
function buildWorkspaceMembersForFixture(
    array $userRows,
    string $organizationName,
    string $workspaceName,
    string $ownerEmail,
    string $yacineEmail = 'yacine@zennety.app'
): array {
    $key = $organizationName.'|'.$workspaceName;
    $notionOrAtlassian = in_array($organizationName, ['Notion Labs', 'Atlassian'], true);
    $members = [];
    foreach ($userRows as $u) {
        $email = $u['email'];
        if ($email === $ownerEmail) {
            $role = 'Owner';
        } elseif ($notionOrAtlassian && $email === $yacineEmail && $ownerEmail !== $yacineEmail) {
            $role = 'Guest';
        } else {
            $role = match (crc32($key.'|member='.$email) % 3) {
                0 => 'Guest',
                1 => 'Admin',
                default => 'Member',
            };
        }
        $members[] = ['email' => $email, 'role' => $role];
    }

    return $members;
}

$boardIndex = 0;
$organizations = [];
$sharedWorkspaceIndex = 0;

foreach ($orgDefs as $org) {
    $workspaces = [];
    foreach ($org['workspaces'] as $ws) {
        $ownerEmail = resolveWorkspaceOwnerEmail($org['name'], $ws['name'], $sharedWorkspaceIndex, $emails);
        $workspaceMembers = buildWorkspaceMembersForFixture($users, $org['name'], $ws['name'], $ownerEmail);
        $sharedWorkspaceIndex++;
        $boards = [];
        $boardList = normalizeWorkspaceBoards($ws['boards'], $org['name'], $ws['name']);
        foreach ($boardList as $b) {
            $wsDesc = $workspaceDescriptions[$ws['name']] ?? 'Workspace for '.$ws['name'].' programs and coordination.';
            $boardLabel = preg_match('/^(.+) \(\d+\)$/', $b['name'], $m) ? $m[1] : $b['name'];
            $bdesc = $boardDescriptions[$b['name']] ?? ($boardDescriptions[$boardLabel] ?? 'Board for '.$b['name'].' work items and decisions.');
            $cards = buildCardsForBoard(
                $b['key'],
                $org['name'],
                $ws['name'],
                $b['name'],
                $others,
                $boardIndex,
                $statuses,
                $priorities,
                $cardTemplates
            );
            $boards[] = [
                'name' => $b['name'],
                'description' => $bdesc,
                'visibility' => 'Public',
                'cards' => $cards,
            ];
            $boardIndex++;
        }
        $wsDesc = $workspaceDescriptions[$ws['name']] ?? 'Workspace for '.$ws['name'].' programs and coordination.';
        $workspaces[] = [
            'name' => $ws['name'],
            'description' => $wsDesc,
            'visibility' => 'Public',
            'ownerEmail' => $ownerEmail,
            'members' => $workspaceMembers,
            'boards' => $boards,
        ];
    }
    $organizations[] = [
        'name' => $org['name'],
        'description' => $org['description'],
        'yacineOrganizationRole' => in_array($org['name'], ['Notion Labs', 'Atlassian'], true) ? 'Owner' : 'Admin',
        'workspaces' => $workspaces,
    ];
}

foreach ($users as $u) {
    $first = explode(' ', $u['name'], 2)[0];
    $orgName = $first.' Personal';
    $personalCards = buildCardsForBoard(
        'personal_inbox',
        $orgName,
        'Personal',
        'Inbox',
        array_values(array_filter($emails, fn ($e) => $e === $u['email'])),
        $boardIndex,
        $statuses,
        $priorities,
        $cardTemplates
    );
    $boardIndex++;
    $organizations[] = [
        'personal' => true,
        'ownerEmail' => $u['email'],
        'name' => $orgName,
        'description' => 'Individual organization for '.$u['name'].'. Only this member owns and manages these boards.',
        'workspaces' => [
            [
                'name' => 'Personal',
                'description' => $workspaceDescriptions['Personal'],
                'visibility' => 'Public',
                'ownerEmail' => $u['email'],
                'members' => [
                    ['email' => $u['email'], 'role' => 'Owner'],
                ],
                'boards' => [
                    [
                        'name' => 'Inbox',
                        'description' => $boardDescriptions['Inbox'],
                        'visibility' => 'Public',
                        'cards' => $personalCards,
                    ],
                ],
            ],
        ],
    ];
}

$data = [
    'users' => $users,
    'organizations' => $organizations,
];

file_put_contents($out, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)."\n");

echo "Wrote $out\n";
