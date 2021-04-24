import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component{
renderErr({ error, touched }) {
    if(touched && error){
        return (
            <div className='ui error message'>
                <div className='header'>
                    {error}
                </div>
            </div>
        )
    }
}

    renderInput = ({ input, label, meta }) => {
        const className=`field ${meta.error && meta.touched? 'error':'' }`
        
        return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete='off' />
            
            {this.renderErr(meta)}
        </div>
        )
        //<input onChange={input.onChange} value={input.value} type='text' />
    }

    onSubmit = (formValues) => {
        this.props.createStream(formValues);
    }
    
    render(){
        return (
        <div>
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className='ui form error'>
                <Field name='title' component={this.renderInput} label='Enter Title' />
                <Field name='description' component={this.renderInput} label='Enter description' />
                <button className='ui button primary'>Submit</button>
            </form>
        </div>
        )
    }
}

const validate = (formValues) => {
    const errors={};
    if (!formValues.title){
        //only run if the user not enter the title
        errors.title='You have to enter a title'
    }
    if(!formValues.description){
        errors.description = 'You need to write a little bit of description'
    }

    return errors;
}

const formWrapped = reduxForm({
    form: 'streamCreate',
    validate: validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);