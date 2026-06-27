/**
 * Ribbon navigation labels for the OpenCart top menu.
 * Software is listed in the ribbon but the demo SUT currently exposes 0 products in that category.
 */
export const ribbonLinks = ['Tablets', 'Software', 'Phones & PDAs', 'Cameras'] as const;

/** Parent ribbon item plus the expected "Show All …" child link in its dropdown. */
export const ribbonDropdownMenus: ReadonlyArray<readonly [parent: string, showAll: string]> = [
    ['Desktops', 'Show All Desktops'],
    ['Laptops & Notebooks', 'Show All Laptops & Notebooks'],
    ['Components', 'Show All Components'],
    ['MP3 Players', 'Show All MP3 Players'],
];
