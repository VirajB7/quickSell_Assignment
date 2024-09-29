import React, { useState, useEffect } from "react";
import "./kanban.css";
import Card from "../card/Card";
import Display from "../navbar/display";
import ColumnHeader from "../header/header";
import SvgMapping from "../svgMapping/svgMapping";

const KanbanBoard = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState(() => {
    return localStorage.getItem("grouping") || "status";
  });
  const [sorting, setSorting] = useState(() => {
    return localStorage.getItem("sorting") || "";
  });
  const [columnHeaders, setColumnHeaders] = useState([]);

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data.tickets);
        setUsers(data.users);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    setColumnHeaders(getColumnHeaders()); // Update the column headers whenever the grouping changes
  }, [grouping]);

  useEffect(() => {
    localStorage.setItem("sorting", sorting);
  }, [sorting]);

  useEffect(() => {
    if (grouping === "user" && users.length === 0) {
      return; // Don't set headers if users are not yet fetched
    }
    setColumnHeaders(getColumnHeaders());
  }, [grouping, users, tickets]);

  const getUserName = (userId) => {
    const user = users.find((user) => user.id === userId);
    return user ? user.name : "Unknown User";
  };

  const getPriority = (priority) => {
    switch (priority) {
      case 0:
        return "No Priority";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
      case 4:
        return "Urgent";
      default:
        return "Unknown Priority";
    }
  };

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  const getColumnHeaders = () => {
    switch (grouping) {
      case "status":
        return [
          { key: "Backlog", header: <ColumnHeader leftSvg={SvgMapping["Backlog"]} term="Backlog" ticketCount={tickets.filter((ticket) => ticket.status === "Backlog").length} /> },
          { key: "Todo", header: <ColumnHeader leftSvg={SvgMapping["Todo"]} term="Todo" ticketCount={tickets.filter((ticket) => ticket.status === "Todo").length} /> },
          { key: "In progress", header: <ColumnHeader leftSvg={SvgMapping["In progress"]} term="In progress" ticketCount={tickets.filter((ticket) => ticket.status === "In progress").length} /> },
          { key: "Done", header: <ColumnHeader leftSvg={SvgMapping["Done"]} term="Done" ticketCount={tickets.filter((ticket) => ticket.status === "Done").length} /> },
          { key: "Canceled", header: <ColumnHeader leftSvg={SvgMapping["Canceled"]} term="Canceled" ticketCount={tickets.filter((ticket) => ticket.status === "Canceled").length} /> },
        ];
      case "user":
        return users.map((user) => ({
          key: user.name,
          header: <ColumnHeader leftSvg={SvgMapping[user.name]} term={user.name} ticketCount={tickets.filter((ticket) => ticket.userId === user.id).length} />,
        }));
      case "priority":
        return [
          { key: "No Priority", header: <ColumnHeader leftSvg={SvgMapping["No Priority"]} term="No Priority" ticketCount={tickets.filter((ticket) => ticket.priority === 0).length} /> },
          { key: "Low", header: <ColumnHeader leftSvg={SvgMapping["Low"]} term="Low" ticketCount={tickets.filter((ticket) => ticket.priority === 1).length} /> },
          { key: "Medium", header: <ColumnHeader leftSvg={SvgMapping["Medium"]} term="Medium" ticketCount={tickets.filter((ticket) => ticket.priority === 2).length} /> },
          { key: "High", header: <ColumnHeader leftSvg={SvgMapping["High"]} term="High" ticketCount={tickets.filter((ticket) => ticket.priority === 3).length} /> },
          { key: "Urgent", header: <ColumnHeader leftSvg={SvgMapping["Urgent"]} term="Urgent" ticketCount={tickets.filter((ticket) => ticket.priority === 4).length} /> },
        ];
      default:
        return [];
    }
  };

  const groupTickets = (tickets) => {
    const groupedTickets = {};
    columnHeaders.forEach(({ key }) => {
      groupedTickets[key] = [];
    });

    tickets.forEach((ticket) => {
      let key;
      switch (grouping) {
        case "status":
          key = ticket.status;
          break;
        case "user":
          key = getUserName(ticket.userId);
          break;
        case "priority":
          key = getPriority(ticket.priority);
          break;
      }
      if (groupedTickets[key]) {
        groupedTickets[key].push(ticket);
      }
    });

    return groupedTickets;
  };

  const sortTickets = (tickets) => {
    if (sorting === "priority") {
      return [...tickets].sort((a, b) => b.priority - a.priority);
    } else if (sorting === "title") {
      return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
    }
    return tickets;
  };

  const groupedTickets = groupTickets(tickets);

  return users.length > 0 && tickets.length > 0 ?(
    <div id="main">
      <div id="navigationPane">
        <Display
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          grouping={grouping}
          sorting={sorting}
          handleGroupingChange={handleGroupingChange}
          handleSortingChange={handleSortingChange}
        />
      </div>
      <div id="kanban_board">
        <div id="inner_kanban_board">
          {columnHeaders.map(({ key, header }) => (
            <div key={key} className="group">
              <div id="heading">
                <h3>{header}</h3>
              </div>
              <div className="group-tickets">
                {sortTickets(groupedTickets[key] || []).map((ticket) => (
                  <Card
                    key={ticket.id}
                    ticket={ticket}
                    grouping={grouping}
                    getUserName={getUserName}
                    getPriority={getPriority}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ):null;
};

export default KanbanBoard;
