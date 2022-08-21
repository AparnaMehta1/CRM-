const TICKET_STATUS = {
    OPEN: "OPEN",
    CLOSED: "CLOSED",
    PROGRESS: "PROGRESS",
    BLOCKED: "BLOCKED",
};

export const getTicketsCount = tickets => {
    

    const countMap = { open: 0, progress: 0, closed: 0, blocked: 0 };
  
    tickets.forEach(ticket => {
        const { status } = ticket;
        if (status === TICKET_STATUS.OPEN) {
            countMap.open = countMap.open + 1;
        } else if (status === TICKET_STATUS.BLOCKED) {
            countMap.blocked = countMap.blocked + 1;
        } else if (status === TICKET_STATUS.PROGRESS) {
            countMap.progress = countMap.progress + 1;
        } else {
            countMap.closed = countMap.closed + 1;
        }
    });
  
    return countMap;
  };