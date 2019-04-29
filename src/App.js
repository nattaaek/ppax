import React from 'react';
import { Container, FormGroup, Form, Input, Label, Button, Row, Col } from 'reactstrap';
import DatePicker from 'react-datepicker';
import axios from 'axios'

import "react-datepicker/dist/react-datepicker.css";

export default class App extends React.Component{

    constructor(){
        super()
        this.state = {
            info: null,
            room : "",
            startDate: new Date(),
            endDate: new Date()
        }
    }

    handleStartDateChange = (date) => {
        this.setState({startDate: date});
    }

    handleEndDateChange = (data) => {
        this.setState({endDate: date});
    }

    handleGenerateData = () => {
        axios.get('http://localhost:3000/url').then(response => {
            this.setState({info: response.data})
        })
    }

    handleRoomchange = (e) => {
        this.setState({room: e.target.value});
    }

    handleSave = () => {
        var payload = {
            id: this.state.info.msg[0].id,
            name: this.state.info.msg[0].name,
            lname: this.state.info.msg[0].lname,
            address: this.state.info.msg[0].address,
            room: this.state.room
        };

        axios.post('http://localhost:3000/insert', payload).then((response) => {
            if(response.status == 200){
                alert("บันทึกสำเร็จ")
            } else{
                alert("มีบางอย่างผิดพลาด")
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    render(){
        return(
        <Container>
            <Form>
                <FormGroup>
                    <Row>
                        <Col xs={12}>
                            <Label>รหัสบัตรประชาชน</Label>
                            <Input type="text" name="id" id="id" placeholder="รหัสบัตรประชาชน" readOnly value={this.state.info === null ? '' : this.state.info.msg[0].id}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={6}>
                            <Label>ชื่อ</Label>
                            <Input type="text" name="name" id="name" placeholder="ชื่อ" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].name}/>
                        </Col>
                        <Col xs={6}>
                            <Label>นามสกุล</Label>
                            <Input type="text" name="lname" id="lname" placeholder="นามสกุล" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].lname}/>
                        </Col>    
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={12}>
                            <Label>ที่อยู่</Label>
                            <Input type="textarea" name="address" id="address" placeholder="ที่อยู่" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].address}/>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={6}>
                            <Label>เลขห้องพัก</Label>
                            <Input type="text" name="room" id="room" placeholder="เลขห้องพัก" onChange={this.handleRoomchange} defaultValue={this.state.room} />
                        </Col>
                        <Col xs={3}>
                            <Input type="checkbox" name="pet" id="pet"/>
                            <Label for="pet" check>สัตว์เลี้ยง</Label>
                        </Col>
                        <Col xs={3}>
                            <Input type="checkbox" name="money" id="money"/>
                            <Label for="money" check>จ่ายเงินสด</Label>
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Row>
                        <Col xs={6}>
                            <Label>เช็คอิน</Label>
                            <DatePicker selected={this.state.startDate} placeholderText="เลือกวันที่ เช็คอิน" 
                            dateFormat="d MMMM yyyy"
                            onChange={this.handleStartDateChange} />
                        </Col>
                        <Col xs={6}>
                            <Label>เช็คเอ้าท์</Label>
                            <DatePicker selected={this.state.endDate} placeholderText="เลือกวันที่ เช็คเอาท์" 
                            dateFormat="d MMMM yyyy"
                            onChange={this.handleEndDateChange} />
                        </Col>
                    </Row>
                </FormGroup>
                <FormGroup>
                    <Button color="primary" size="lg" block onClick={this.handleGenerateData}>รับข้อมูล</Button>
                    <Button color="primary" size="lg" block onClick={this.handleSave}>บันทึก</Button>
                </FormGroup>
            </Form>
        </Container>
        );
    }
}