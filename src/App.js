import React from 'react';
import { Container, FormGroup, Form, Input, Label, Button } from 'reactstrap';
import axios from 'axios'

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
                    <Label>รหัสบัตรประชาชน</Label>
                    <Input type="text" name="id" id="id" placeholder="รหัสบัตรประชาชน" readOnly value={this.state.info === null ? '' : this.state.info.msg[0].id}/>
                    <Label>ชื่อ</Label>
                    <Input type="text" name="name" id="name" placeholder="ชื่อ" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].name}/>
                    <Label>นามสกุล</Label>
                    <Input type="text" name="lname" id="lname" placeholder="นามสกุล" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].lname}/>
                    <Label>รหัสบัตรประชาชน</Label>
                    <Input type="textarea" name="address" id="address" placeholder="ที่อยู่" readOnly value={this.state.info === null ? '' :this.state.info.msg[0].address}/>
                    <Label>เลขห้องพัก</Label>
                    <Input type="text" name="room" id="room" placeholder="เลขห้องพัก" onChange={this.handleRoomchange} defaultValue={this.state.room} />
                </FormGroup>
                <Button color="primary" size="lg" block onClick={this.handleGenerateData}>รับข้อมูล</Button>
                <Button color="primary" size="lg" block onClick={this.handleSave}>บันทึก</Button>
            </Form>
        </Container>
        );
    }
}