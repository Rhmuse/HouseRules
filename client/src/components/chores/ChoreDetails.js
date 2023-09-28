import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import { addChore, assignChore, getChoreById, unassignChore } from '../../managers/choreManager';
import { Button, Container, Input, Label, List, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';
import { getUserProfiles } from '../../managers/userProfileManager';

const difficultyOptions = [{
    value: "Select a difficulty...",
    difficulty: 0
}, {
    value: "1",
    difficulty: 1
}, {
    value: "2",
    difficulty: 2
}, {
    value: "3",
    difficulty: 3
}, {
    value: "4",
    difficulty: 4
}, {
    value: "5",
    difficulty: 5
}];

export const ChoreDetails = () => {
    const { choreId } = useParams();
    const navigate = useNavigate();

    const [chore, setChore] = useState({});
    const [users, setUsers] = useState([]);
    const [errors, setError] = useState("");

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

    const handleSubmit = () => {
        addChore(chore).then(res => {
            if (res.errors) {
                setError(res.errors)
            } else {
                navigate(`/chores`)
            }
        })
    }

    if (users.length === 0) return null;
    return (
        <Container>
            <Container style={{ display: "flex", flexDirection: "row", padding: "1rem" }}>
                <Label htmlFor='choreNameInput' style={{ paddingRight: "1rem" }}><h3>Name:</h3></Label>
                <Input type='text' id='choreNameInput' value={chore.name} onChange={(e) => {
                    const copy = { ...chore };
                    copy.name = e.target.value;
                    setChore(copy);
                }} /></Container>
            <List>
                <ListGroup>
                    <ListGroupItem>
                        <Label htmlFor='choreDifficultyInput'>Difficulty:</Label>
                        <Input type='select' id='choreDifficultyInput' value={chore.difficulty} onChange={(e) => {
                            const copy = { ...chore };
                            copy.difficulty = e.target.value;
                            setChore(copy);
                        }}>
                            {
                                difficultyOptions.map(opt => {
                                    return (
                                        <option key={`option-${opt.difficulty}`} value={opt.difficulty}> {opt.value}</option>
                                    )
                                })
                            }
                        </Input>
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
            <div style={{ color: "red" }}>
                {Object.keys(errors).map((key) => (
                    <p key={key}>
                        {key}: {errors[key].join(",")}
                    </p>
                ))}
            </div>
            <Container style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button onClick={() => handleSubmit()} >Save</Button>
            </Container>
        </Container>
    )
}