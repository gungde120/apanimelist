// Function to convert a date into "DD Month YYYY" format
export const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
};

// Function to convert a timestamp into a human-readable format
export const timeAgo = (timestamp) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(timestamp)) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval >= 1) {
        return `${interval} year${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
        return `${interval} month${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
        return `${interval} day${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
        return `${interval} hour${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
        return `${interval} min${interval === 1 ? '' : 's'} ago`;
    }
    interval = Math.floor(seconds / 1);
    if (interval >= 1) {
        return `${interval} s${interval === 1 ? '' : ''} `;
    }

    return 'now';
};