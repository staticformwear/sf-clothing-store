// Toggle menu open/close
function toggleMenu() {
    const menu = document.getElementById('menuOverlay');
    menu.classList.toggle('active');
    if (menu.classList.contains('active')) {
        switchPanel('mainPanel');
    }
}

// Switch between panels in the multi-level menu
function switchPanel(panelId) {
    const panels = document.querySelectorAll('.menu-panel');
    panels.forEach(panel => panel.classList.remove('active'));
    const targetPanel = document.getElementById(panelId);
    if (targetPanel) {
        targetPanel.classList.add('active');
    }
}

// Toggle accordion submenus and arrows
function toggleAccordion(id) {
    const content = document.getElementById(id);
    const arrow = document.getElementById(id + 'Arrow');
    content.classList.toggle('active');
    if (content.classList.contains('active')) {
        arrow.textContent = 'v';
    } else {
        arrow.textContent = '>';
    }
}

// Initialize event listeners when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const clickableItems = document.querySelectorAll('.has-sub');
    clickableItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetPanel = item.getAttribute('data-target');
            if (targetPanel) {
                switchPanel(targetPanel);
            }
        });
    });
});
