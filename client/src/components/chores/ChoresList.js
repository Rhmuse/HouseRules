import { useEffect, useState } from 'react';
import { completeChore, deleteChore, getChores } from '../../managers/choreManager';
import { Button, Container, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { Link } from 'react-router-dom';

export const ChoresList = ({ loggedInUser }) => {
    const [chores, setChores] = useState([]);

    useEffect(() => {
        retrieveChores();
    }, []);

    const retrieveChores = () => {
        getChores().then(setChores);
    }

    const handleDelete = (choreId) => {
        deleteChore(choreId).then(() => retrieveChores())
    };

    const handleComplete = (choreId) => {
        completeChore(choreId, loggedInUser.id).then((res) => {
            if (res.ok) {
                window.alert("Chore Completed!")
            } else {
                window.alert(res.statusText);
            }
        })
    }


    return (
        <>
            {
                loggedInUser.roles.includes("Admin")
                    ? <Container style={{ display: 'flex', justifyContent: "space-between" }}>
                        <h2>Chores</h2>
                        <Link to="create">
                            <Button>New Chore</Button>
                        </Link>
                    </Container>
                    : <Container>
                        <h2>Chores</h2>
                    </Container>}

            <Container>
                <List>
                    <ListGroup>
                        {
                            chores.map(c => {
                                return (
                                    <ListGroupItem key={`chore-${c.id}`}>
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
        </>
    )
}