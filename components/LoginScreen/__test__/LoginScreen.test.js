import React from 'react';
import renderer from 'react-test-renderer';
import { LoginScreen } from '../LoginScreen';

test('[#] Login screen', () => {
    it ('Test test :)', done => {
        const tree = renderer.create(<LoginScreen />);
        console.log(tree);
        done();
    })
});