export const receiveMessage = (state, message) => {
    state.messages = [...state.messages, message];
};

export const receiveMessageNewChat = (state, messages) => {
    state.messages = [...messages];
};

export const contacts = (state, contacts) => {
    state.contacts = [...contacts];
}

export const selectedUser = (state, selectedUser) => {
    state.selectedUser = selectedUser;
}

export const notifications = (state, notifications) => {
    state.notifications = notifications;
}

export const room = (state, room) => {
    state.room = room;
}

export const prevRoom = (state, prevRoom) => {
    state.prevRoom = prevRoom;
}

export const loading = (state) => {
    state.loading = !state.loading;
}