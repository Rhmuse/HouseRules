import { useEffect, useState } from 'react';
import { getUserProfiles } from '../../managers/userProfileManager';
import { Button, Container, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export const UserProfileList = () => {
    const [userProfiles, setUserProfiles] = useState([]);

    const retrieveUserProfiles = () => {
        getUserProfiles().then(setUserProfiles);
    }

    useEffect(() => {
        retrieveUserProfiles();
    }, [])

    return <Container>
        <Table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>UserName</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {userProfiles.map(up => {
                    return (
                        <tr key={`userProfile-${up.id}`}>
                            <th scope='row'>{up.id}</th>
                            <td>{up.firstName} {up.lastName}</td>
                            <td>{up?.identityUser?.email}</td>
                            <td>{up?.identityUser?.userName}</td>
                            <td><Link to={`${up.id}`}><Button>Details</Button></Link></td>
                        </tr>
                    )
                })}
            </tbody>
        </Table>
    </Container>
};