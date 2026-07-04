// Theme Types
export interface Theme {
    id: string;
    name: string;
    sidebar: string;
    sidebarText: string;
    activeNav: string;
    appBg: string;
    panelBg: string;
    panelText: string;
    card?: string;
    docBg: string;
    docText: string;
    docBorder: string;
    main?: string;
    accent: string;
    icon?: string;
    heatmapCritical: string;
    heatmapHigh: string;
    buttonSecondary: string;
    toggleActive: string;
    toggleInactive: string;
    roastBg: string;
    roastBorder: string;
    roastTitle: string;
    roastText: string;
    roastIcon: string;
    roastShareBtn: string;
    comparisonBoxCurrent: string;
    comparisonBoxProposed: string;
    citation: string;
    detailHeader: string;
    roastTitleRed: string;
    selectedIssue: string;
    selectedIssueRoast: string;
}

export type ThemeId =
    | 'navy'
    | 'dark'
    | 'gray'
    | 'eggshell'
    | 'burgundy'
    | 'purple'
    | 'royalBlue'
    | 'forest'
    | 'sand'
    | 'colorful';
