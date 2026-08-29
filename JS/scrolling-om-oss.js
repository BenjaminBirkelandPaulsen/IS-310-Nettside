const memberOrder = ['hina', 'tam', 'benjamin', 'aisha', 'jankaare'];
let currentMemberIndex = -1;
let lastWheelTime = 0;
let wheelAccumulator = 0;
const wheelStepSize = 180;
const wheelCooldownMs = 150;

function resetInitialState() {
    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper) {
        pageWrapper.classList.remove('active-profile');
    }

    document.querySelectorAll('.member-node').forEach(node => node.classList.remove('active'));
    document.querySelectorAll('.profile-content').forEach(content => {
        content.style.display = 'none';
    });

    currentMemberIndex = -1;
}

function openMember(id, showCard = true) {
    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper) {
        if (showCard) {
            pageWrapper.classList.add('active-profile');
        } else {
            pageWrapper.classList.remove('active-profile');
        }
    }

    document.querySelectorAll('.member-node').forEach(node => node.classList.remove('active'));
    const activeNode = document.getElementById('node-' + id);
    if (activeNode) activeNode.classList.add('active');

    document.querySelectorAll('.profile-content').forEach(content => {
        content.style.display = 'none';
    });

    const selectedProfile = document.getElementById('profile-' + id);
    if (selectedProfile) {
        selectedProfile.style.display = showCard ? 'block' : 'none';
    }
}

function setMemberByIndex(index, showCard = true) {
    currentMemberIndex = Math.max(0, Math.min(memberOrder.length - 1, index));
    openMember(memberOrder[currentMemberIndex], showCard);
}

function changeMember(direction, showCard = true) {
    if (currentMemberIndex === -1) {
        currentMemberIndex = 0;
        openMember(memberOrder[0], showCard);
        return;
    }

    setMemberByIndex(currentMemberIndex + direction, showCard);
}

function handleWheelEvent(event) {
    const currentTime = Date.now();
    const delta = event.deltaY || event.deltaX || 0;
    if (delta === 0) return;

    if (currentTime - lastWheelTime < wheelCooldownMs && Math.abs(delta) < 80) {
        return;
    }

    lastWheelTime = currentTime;
    wheelAccumulator += delta;

    const steps = Math.trunc(Math.abs(wheelAccumulator) / wheelStepSize);
    if (steps <= 0) {
        event.preventDefault();
        window.scrollTo(0, 0);
        return;
    }

    event.preventDefault();
    const direction = wheelAccumulator > 0 ? 1 : -1;
    wheelAccumulator -= direction * steps * wheelStepSize;

    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper && !pageWrapper.classList.contains('active-profile')) {
        pageWrapper.classList.add('active-profile');
    }

    for (let i = 0; i < steps; i++) {
        changeMember(direction, true);
    }

    window.scrollTo(0, 0);
}

function handleKeydown(event) {
    if (event.key === 'ArrowDown' || event.key === 'PageDown') {
        event.preventDefault();
        const pageWrapper = document.getElementById('pageWrapper');
        if (pageWrapper && !pageWrapper.classList.contains('active-profile')) {
            pageWrapper.classList.add('active-profile');
        }
        changeMember(1, true);
    }

    if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        const pageWrapper = document.getElementById('pageWrapper');
        if (pageWrapper && !pageWrapper.classList.contains('active-profile')) {
            pageWrapper.classList.add('active-profile');
        }
        changeMember(-1, true);
    }
}

function closeProfile() {
    const pageWrapper = document.getElementById('pageWrapper');
    if (pageWrapper) {
        pageWrapper.classList.remove('active-profile');
    }
    currentMemberIndex = -1;
}

window.addEventListener('wheel', handleWheelEvent, { passive: false });
window.addEventListener('keydown', handleKeydown);
window.addEventListener('load', () => {
    resetInitialState();
    window.scrollTo(0, 0);
});

resetInitialState();
window.scrollTo(0, 0);