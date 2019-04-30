import React from 'react';
import { Table, Container, Button } from 'reactstrap';

export default class Get extends React.Component{

    constructor(){
        this.state = {
            info: null
        }
        alert('test')
    }

    handleGenerateData = () => {
        axios.get('http://localhost:3000/ticket').then(response => {
            this.setState({info: response.data})
        })
    }

    render(){
        return(
            <Container>
                <Table>
                    <thead>
                        <th>ลำดำ</th>
                        <th>ชื่อ-สกุล</th>
                        <th>เช็คอิน</th>
                        <th>เช็คเอ้าท์</th>
                    </thead>
                    <tbody>
                        {this.state.info.map((value, index) => {
                          return(
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                          );  
                        })}
                    </tbody>
                </Table>

                <Button onClick={this.handleGenerateData} color="primary">รับข้อมูล</Button>
            </Container>
        );
    }
}