import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { assignChore, getChoreById, unassignChore } from '../../managers/choreManager';
import { Container, Input, Label, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { getUserProfiles } from '../../managers/userProfileManager';

export const ChoreDetails = () => {
    const { choreId } = useParams();

    const [chore, setChore] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        retrieveChore(choreId);
        retrieveUsers();
    }, [])

    const retrieveChore = (choreId) => {
        getChoreById(choreId).then(setChore);
    };

    const retrieveUsers = () => {
        getUserProfiles().then(setUsers);
    }

    const isUserSelected = (userId) => {
        return chore?.choreAssignments?.some(ca => ca.userProfileId === userId);
    }

    const handleBoxCheck = (userId) => {
        if (chore?.choreAssignments?.some(ca => ca.userProfileId === userId)) {
            return unassignChore(chore.id, userId).then(() => retrieveChore(choreId));
        } else {
            return assignChore(chore.id, userId).then(() => retrieveChore(choreId));
        }
    }

    if (users.length === 0) return null;
    return (
        <Container>
            <h3>{chore.name}</h3>
            <List>
                <ListGroup>
                    <ListGroupItem>
                        <ListGroupItemHeading>Difficulty:</ListGroupItemHeading>
                        <ListGroupItemText>{chore.difficulty}/5</ListGroupItemText>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>Assignees:</ListGroupItemHeading>
                        <Container style={{ display: "flex", flexDirection: "column" }}>
                            {
                                users.map(u => {
                                    return (
                                        <Container key={`user-${u.id}`}>
                                            {
                                                isUserSelected(u.id)
                                                    ? <Input type='checkbox' id={`userCheckbox-${u.id}`} checked onChange={() => handleBoxCheck(u.id)} />
                                                    : <Input type='checkbox' id={`userCheckbox-${u.id}`} onChange={() => handleBoxCheck(u.id)} />
                                            }
                                            {" "}<Label htmlFor={`userCheckbox-${u.id}`}>{u.firstName} {u.lastName}</Label>
                                        </Container>
                                    )
                                })
                            }</Container>
                    </ListGroupItem>
                    <ListGroupItem>
                        <ListGroupItemHeading>Most Recent Completion:</ListGroupItemHeading>
                        <ListGroupItemText>
                            {chore?.choreCompletions?.length > 0
                                ? `On ${chore?.choreCompletions?.slice(-1).pop().completedOn.split("T")[0]} by ${chore?.choreCompletions.slice(-1).pop().userProfile.firstName} ${chore?.choreCompletions.slice(-1).pop().userProfile.lastName}`
                                : "N/A"}
                        </ListGroupItemText>
                    </ListGroupItem>
                </ListGroup>
            </List>
        </Container>
    )
}