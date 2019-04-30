import React from 'react';
import { Container, FormGroup, Form, Input, Label, Button, Row, Col } from 'reactstrap';
import axios from 'axios'

const fs = require('fs');

export default class App extends React.Component{

    constructor(){
        super()
        this.state = {
            info: null,
            room : ""
        }
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
        if(this.state.room === '' || this.state.room === null){
            alert("กรุณากรอกเลขห้องพัก");
        } else {
            var payload = {
                id: this.state.info.msg[0].id,
                name: this.state.info.msg[0].name,
                lname: this.state.info.msg[0].lname,
                address: this.state.info.msg[0].houseno + ' ' + this.state.info.msg[0].moo + ' ' + this.state.info.msg[0].troke + ' ' + this.state.info.msg[0].soi +
                this.state.info.msg[0].road + ' ' + this.state.info.msg[0].subdistrict + ' ' + this.state.info.msg[0].district + ' ' + this.state.info.msg[0].province,
                room: this.state.room
            };
    
            axios.post('http://localhost:3000/insert', payload).then((response) => {
                if(response.status == 200){
                    alert("บันทึกสำเร็จ");
                    fs.unlink('/assets/user.csv', err => {
                        if(err) throw err;
                    })
                } else{
                    alert("มีบางอย่างผิดพลาด");
                }
            }).catch((error) => {
                console.log(error);
            });
        }

    }

    render(){
        return(
        <Container>
            <Form>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label>รหัสบัตรประชาชน</Label>
                            <Input type="text" name="id" id="id" placeholder="รหัสบัตรประชาชน" readOnly value={this.state.info === null ? '' : this.state.info.msg[0].id}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={2}>
                        <FormGroup>
                            <Label>คำนำหน้า</Label>
                            <Input type="text" name="initname" id="initname" placeholder="คำนำหน้า" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].initname}/>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Label>ชื่อ</Label>
                            <Input type="text" name="name" id="name" placeholder="ชื่อ" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].name}/>
                        </FormGroup>
                    </Col>
                    <Col md={5}>
                        <FormGroup>
                            <Label>นามสกุล</Label>
                            <Input type="text" name="lname" id="lname" placeholder="นามสกุล" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].lname}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label>วันเกิด</Label>
                            <Input type="text" name="birthdate" id="birthdate" placeholder="วันเกิด" readOnly value={this.state.info === null ? '' : this.state.info.msg[0].birthdate}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label>ศาสนา</Label>
                            <Input type="text" name="religion" id="religion" placeholder="ศาสนา" readOnly value={this.state.info === null ? '' : this.state.info.msg[0].religion}/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label>ที่อยู่</Label>
                            <Input type="textarea" name="address" id="address" placeholder="ที่อยู่" readOnly value={this.state.info === null ? '' : 
                            this.state.info.msg[0].houseno + ' ' + this.state.info.msg[0].moo + ' ' + this.state.info.msg[0].troke + ' ' + this.state.info.msg[0].soi +
                            this.state.info.msg[0].road + ' ' + this.state.info.msg[0].subdistrict + this.state.info.msg[0].district + ' ' + this.state.info.msg[0].province}  />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={12}>
                        <FormGroup>
                            <Label>เลขห้องพัก</Label>
                            <Input required type="text" name="room" id="room" placeholder="เลขห้องพัก" onChange={this.handleRoomchange} defaultValue={this.state.room} />
                        </FormGroup>
                    </Col>
                </Row>
                <Button color="primary" size="lg" block onClick={this.handleGenerateData}>รับข้อมูล</Button>
                <Button color="primary" size="lg" block onClick={this.handleSave}>บันทึก</Button>
            </Form>
        </Container>
        );
    }
}