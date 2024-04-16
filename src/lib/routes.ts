export const routes = [
    {
        label: 'Home',
        image: '/svg/home.svg',
        href: '/',
        color: "text-slate-600",
    },
    {
        label: 'Saved',
        image: '/svg/bookmark.svg',
        href: '/bookmarks',
        color: "text-slate-600",
    },
    {
        label: 'Profile',
        image: '/svg/user.svg',
        href: '/account',
        color: "text-slate-600",
    },
];

export const accountRoutes = [
    {
        label: "Edit Profile",
        href: "/account/edit",
    },
    {
        label: "Notifications",
        href: "/account/notifications",
    },
    {
        label: "Email Notifications",
        href: "/account/enotifications",
    },
    {
        label: "Post Preference",
        href: "/account/view",
    },
    {
        label: "Help",
        href: "/account/help",
    },
];