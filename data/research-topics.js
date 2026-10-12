// Research topics shown in the research side menu and on the /research/ overview.
// Each topic has its own page at research/<id>/index.html.
//   status:    'completed' | 'ongoing' | 'planned'
//   subtopics: sections inside the topic page ({ id, title }), linked from the menu
window.RESEARCH_TOPICS = [
    {
        id: 'building-grid-resiliency',
        title: 'Building–Grid Resiliency',
        status: 'planned',
        summary: 'How buildings and distribution grids behave through weather-driven outages and recovery, from a single house to the feeder level.',
        subtopics: [
            { id: 'review', title: 'Review' },
            { id: 'single-house', title: 'Single House Level' },
            { id: 'feeder-level', title: 'Feeder Level' }
        ]
    },
    {
        id: 'outage-prediction',
        title: 'Power Outage Prediction',
        status: 'planned',
        summary: 'Forecasting rare, large-scale weather-induced power outages for single and multiple counties.',
        subtopics: [
            { id: 'single-county', title: 'Single County' },
            { id: 'multi-county', title: 'Multi County' }
        ]
    },
    {
        id: 'datacenter',
        title: 'Datacenter',
        status: 'planned',
        summary: 'Thermal-aware operation of high-performance computing environments.',
        subtopics: []
    },
    {
        id: 'hvac-control',
        title: 'AI-Based HVAC Optimal Control',
        status: 'completed',
        summary: 'ANN-based HVAC control demonstrated at a U.S. manufacturing plant: 13.1% cooling and 25.2% heating energy savings.',
        subtopics: []
    }
];
