import { useState } from 'react'
import { Button, Container, Form, Input, Label } from 'reactstrap'
import { addChore } from '../../managers/choreManager';
import { useNavigate } from 'react-router-dom'

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
export const CreateChore = () => {
    const navigate = useNavigate();
    const [choreBuilder, setChoreBuilder] = useState({
        name: "",
        difficulty: 0,
        choreFrequencyDays: 1,
    });

    const handleSubmit = () => {
        addChore(choreBuilder).then(res => navigate(`/chores/${res.id}`))
    }

    return (
        <Container>
            <Form>
                <Label htmlFor='choreNameInput'>Name:</Label>
                <Input type='text' id='choreNameInput' value={choreBuilder.name} onChange={(e) => {
                    const copy = { ...choreBuilder };
                    copy.name = e.target.value;
                    setChoreBuilder(copy);
                }} />
                <Label htmlFor='choreDifficultyInput'>Difficulty:</Label>
                <Input type='select' id='choreDifficultyInput' value={choreBuilder.difficulty} onChange={(e) => {
                    const copy = { ...choreBuilder };
                    copy.difficulty = e.target.value;
                    setChoreBuilder(copy);
                }}>
                    {
                        difficultyOptions.map(opt => {
                            return (
                                <option key={`option-${opt.difficulty}`} value={opt.difficulty}> {opt.value}</option>
                            )
                        })
                    }
                </Input>
                <Label htmlFor='choreFrequencyInput'>Frequency (in days):</Label>
                <Input value={choreBuilder.choreFrequencyDays} type='number' min="1" id="choreFrequencyInput" onChange={e => {
                    const copy = { ...choreBuilder };
                    copy.choreFrequencyDays = e.target.value;
                    setChoreBuilder(copy);
                }} />
                <Container style={{ display: "Flex", justifyContent: "flex-end", padding: "1rem" }}>
                    <Button onClick={() => handleSubmit()} >Submit</Button>
                </Container>

            </Form>
        </Container>
    )
}