// Research topics shown in the research side menu and on the /research/ overview.
// Each topic has its own page at research/<id>/index.html.
//   status:    'completed' | 'ongoing' | 'planned' | 'under-review' | 'reviewed'
//   subtopics: sections inside the topic page ({ id, title, status }), linked from the menu
window.RESEARCH_TOPICS = [
    {
        id: 'building-grid-resiliency',
        title: 'Building–Grid Restoration',
        status: 'ongoing',
        summary: 'How buildings and distribution grids behave through weather-driven outages and recovery, from a single house to the feeder level.',
        subtopics: [
            { id: 'review', title: 'Review', status: 'under-review', summary: 'A review of 108 studies on how building–grid restoration is modeled, evaluated, and used in decisions, using the TCED lens.' },
            { id: 'single-house', title: 'Single House Level', status: 'planned' },
            { id: 'feeder-level', title: 'Feeder Level', status: 'planned' }
        ]
    },
    {
        id: 'outage-prediction',
        title: 'Power Outage Prediction',
        status: 'ongoing',
        summary: 'Forecasting rare, large-scale weather-induced power outages for single and multiple counties.',
        subtopics: [
            { id: 'single-county', title: 'Single County', status: 'reviewed', summary: 'Temporal Fusion Transformer forecasts of weather-related outages in Wake County, NC: R² of 0.777 and nearly 50% lower MAE than an LSTM.' },
            { id: 'multi-county', title: 'Multi County', status: 'under-review', summary: 'Single- vs. multi-county TFT training in Wake and Guilford Counties, NC: multi-county learning helped Guilford but reduced accuracy in Wake.' }
        ]
    },
    {
        id: 'heat-pump-identification',
        title: 'Heat Pump Identification',
        status: 'ongoing',
        summary: 'Identifying heat-pump loads at the distribution-feeder level with data-driven methods, and building load profiles for transmission and distribution system models.',
        subtopics: []
    },
    {
        id: 'datacenter',
        title: 'Data Center Thermal Analysis',
        status: 'under-review',
        summary: "Which servers in a GPU data center run warm, and why: location in the rack explains most of the difference, while each node's recent temperature best predicts the next few minutes.",
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
