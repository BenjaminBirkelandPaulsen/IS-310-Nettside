function openMember(id) {
    // 1. Krymp sirkelen og flytt den til venstre
    document.getElementById('pageWrapper').classList.add('active-profile');
    
    // 2. Oppdater aktiv markering på noder
    document.querySelectorAll('.member-node').forEach(node => node.classList.remove('active'));
    const activeNode = document.getElementById('node-' + id);
    if (activeNode) activeNode.classList.add('active');

    // 3. Skjul alle profilinnhold-seksjoner
    document.querySelectorAll('.profile-content').forEach(content => {
        content.style.display = 'none';
    });

    // 4. Vis innholdet til den valgte personen
    const selectedProfile = document.getElementById('profile-' + id);
    if (selectedProfile) {
        selectedProfile.style.display = 'block';
    }
}

function closeProfile() {
    // Tilbakestill sirkel til sentrum og skjul markeringer
    document.getElementById('pageWrapper').classList.remove('active-profile');
    document.querySelectorAll('.member-node').forEach(node => node.classList.remove('active'));
}