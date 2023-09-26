import { useEffect, useState } from 'react'
import { getUserProfileById } from '../../managers/userProfileManager';
import { useParams } from 'react-router-dom';
import { Container, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

export const UserProfileDetails = () => {
    const [userProfile, setUserProfile] = useState();

    const { userId } = useParams()

    const retrieveUserProfile = (userId) => {
        return getUserProfileById(userId).then(setUserProfile);
    }

    const isChoreOverDue = (choreAssignment) => {
        if (choreAssignment.chore.choreCompletions === null) return true;
        const choreFrequency = choreAssignment.chore.choreFrequencyDays * 86400000;
        const mostRecentCompletion = choreAssignment.chore.choreCompletions[choreAssignment.chore.choreCompletions.length - 1];
        const completedOn = Date.parse(mostRecentCompletion.completedOn)
        return Date.now() - completedOn > choreFrequency;
    }

    useEffect(() => {
        retrieveUserProfile(userId);
    }, [])

    if (!userProfile) return <></>

    return (
        <Container>
            <h2>{userProfile.firstName} {userProfile.lastName}</h2>
            <h4>Assigned Chores:</h4>
            <List>
                <ListGroup>
                    {userProfile.choreAssignments.map(ca => {
                        return (
                            <ListGroupItem key={`choreAssignment-${ca.id}`}>
                                <ListGroupItemHeading>{ca.chore.name}</ListGroupItemHeading>
                                <ListGroupItemText>Difficulty: {ca.chore.difficulty}</ListGroupItemText>
                                <ListGroupItemText>Last Completed On:
                                    {ca?.chore?.choreCompletions?.length > 0
                                        ? ca?.chore?.choreCompletions?.slice(-1).pop().completedOn.split("T")[0]
                                        : "N/A"}
                                </ListGroupItemText>
                                <ListGroupItemText>Overdue: {isChoreOverDue(ca) ? "Yes" : "No"}</ListGroupItemText>
                            </ListGroupItem>
                        )
                    })}
                </ListGroup>
            </List>
        </Container>
    );
}