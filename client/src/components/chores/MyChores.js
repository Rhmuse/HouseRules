import { useEffect, useState } from 'react';
import { Button, Container, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from "reactstrap";
import { completeChore, deleteChore, getMyChoreAssignments } from '../../managers/choreManager';
import { Link } from 'react-router-dom';

export const MyChores = ({ loggedInUser }) => {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        retrieveChores();
    }, []);

    const retrieveChores = () => {
        getMyChoreAssignments(loggedInUser.id).then((res) => {
            const myChores = []
            res.forEach((ca => {
                myChores.push(ca.chore)
            }))
            setChores(myChores);
        })
    }

    const handleBackgroundColor = (bool) => {
        if (bool) return { backgroundColor: 'red' }
        return {}
    }

    const handleComplete = (choreId) => {
        completeChore(choreId, loggedInUser.id).then((res) => {
            if (res.ok) {
                retrieveChores();
            } else {
                window.alert(res.statusText);
            }
        })
    }

    const handleDelete = (choreId) => {
        deleteChore(choreId).then(() => retrieveChores())
    };

    return (
        <Container>
            <List>
                <ListGroup>
                    {
                        chores.map(c => {
                            return (
                                <ListGroupItem key={`chore-${c.id}`} style={handleBackgroundColor(c.overdue)}>
                                    <ListGroupItemHeading style={{ display: "flex", justifyContent: "space-between" }}>
                                        {c.name}
                                        <div>
                                            <Button onClick={() => handleComplete(c.id)}>Complete</Button>{" "}
                                            {
                                                loggedInUser.roles.includes("Admin")
                                                &&
                                                <>
                                                    <Link to={`${c.id}`}>
                                                        <Button>Details</Button>
                                                    </Link>
                                                    {" "}
                                                    <Button onClick={() => { handleDelete(c.id) }}>Delete</Button>
                                                </>
                                            }
                                        </div>
                                    </ListGroupItemHeading>
                                    <ListGroupItemText>Frequency: Every {c.choreFrequencyDays} Days</ListGroupItemText>
                                    <ListGroupItemText>Difficulty: {c.difficulty}</ListGroupItemText>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>

            </List>
        </Container>
    )
}