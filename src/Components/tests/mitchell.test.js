import React from 'react';
import ReactDom from 'react-dom'
import Comments from '../Comments/Comments';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {commentPoster} from '../Logic/Logic'

configure({ adapter: new Adapter() });

describe('testing comment logic',()=>{
    const comments = shallow(<Comments/>)
    test('State commentPlaceHolder should be "Add a public comment..."', () => {
        expect(comments.state().commentPlaceHolder).toBe('Add a public comment...')
    })
})