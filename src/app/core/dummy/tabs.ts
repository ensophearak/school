export const Tabs = {
    sampleTabs: [
        { key: 1, name: 'All', route: '' },
        { key: 2, name: 'Draft', route: '' },
        { key: 3, name: 'Public', route: '' },
    ],
    companyTabs: [
        { key: 1, name: 'Active', route: '/dashboard/company/active' },
        { key: 2, name: 'Disable', route: '/dashboard/company/disable' },
    ],


    schoolsTabs: [
        { key: 1, name: 'Active', route: '/schools/listings/active' },
        { key: 2, name: 'Disable', route: '/schools/listings/disable' },
    ],


    schoolProfileTabs: [
        { key: 1, name: 'Overview', route: '/school-config/profile/overview' },
        { key: 2, name: 'About', route: '/school-config/profile/about' },
        { key: 3, name: 'Events', route: '/school-config/profile/admissions' },
        { key: 4, name: 'Announcements', route: '/school-config/profile/admissions' },
        { key: 5, name: 'Partners', route: '/school-config/profile/admissions' },
        { key: 6, name: 'Management Team ', route: '/school-config/profile/admissions' },
        { key: 7, name: 'Programs', route: '/school-config/profile/admissions' },
        { key: 8, name: 'Campus', route: '/school-config/profile/campus' },
    ],


    schoolPanelTabs: [
        { key: 1, name: 'Campus', route: '/schools/listings/detail/', path: 'campus' },
        { key: 2, name: 'Departments', route: '/schools/listings/detail', path: 'departments' },
    ]
}
