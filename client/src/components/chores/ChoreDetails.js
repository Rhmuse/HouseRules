import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getChoreById } from '../../managers/choreManager';
import { Container, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export const ChoreDetails = () => {
    const { choreId } = useParams();

    const [chore, setChore] = useState({});

    useEffect(() => {
        retrieveChore(choreId);
    }, [])

    const retrieveChore = (choreId) => {
        getChoreById(choreId).then(setChore);
    };

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
                        {chore?.choreAssignments?.map(ca => {
                            return (
                                <ListGroupItemText key={`assignee-${ca.userProfile.id}`}>- {ca.userProfile.firstName} {ca.userProfile.lastName}</ListGroupItemText>
                            )
                        })}
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