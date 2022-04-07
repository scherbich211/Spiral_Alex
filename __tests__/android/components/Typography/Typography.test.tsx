import 'react-native';
import React from 'react';
import Typography from '../../../../src/components/Typography';
import { render } from '@testing-library/react-native';

describe('Testing primary typography', () => {
  const normal = render(<Typography>Hello world</Typography>);
  const stylesNormal = normal.toJSON().props.style;
  it('Should render', () => {
    expect(normal.toJSON()).toBeTruthy();
  });
  it('color black', () => {
    expect(stylesNormal[0].color).toEqual('#000000');
  });
  it('fontWeight 400', () => {
    expect(stylesNormal[0].fontWeight).toEqual('400');
  });
  it('fontSize 14', () => {
    expect(stylesNormal[2].fontSize).toEqual(14);
  });
  it('fontFamily RobotoCondensed-Regular', () => {
    expect(stylesNormal[2].fontFamily).toEqual('RobotoCondensed-Regular');
  });

  
});

describe('Testing h1 typography', () => {
  const normalh1 = render(<Typography element='h1'>Hello world</Typography>);
  const h1 = normalh1.toJSON()
  const stylesNormalh1 = h1.props.style;
  it('Should render', () => {
    expect(h1).toBeTruthy();
  });
  it('fontWeight bold', () => {
    expect(stylesNormalh1[2].fontWeight).toEqual('bold');
  });
  it('fontSize 24', () => {
    expect(stylesNormalh1[2].fontSize).toEqual(24);
  });
  it('fontFamily Roboto-Regular', () => {
    expect(stylesNormalh1[2].fontFamily).toEqual('Roboto-Regular');
  });
});

describe('Testing h2 typography', () => {
  const normalh2 = render(<Typography element='h2'>Hello world</Typography>);
  const h2 = normalh2.toJSON()
  const stylesNormalh2 = h2.props.style;
  it('Should render', () => {
    expect(h2).toBeTruthy();
  });
  it('fontWeight bold', () => {
    expect(stylesNormalh2[2].fontWeight).toEqual('bold');
  });
  it('fontSize 24', () => {
    expect(stylesNormalh2[2].fontSize).toEqual(24);
  });
  it('fontFamily Roboto-Regular', () => {
    expect(stylesNormalh2[2].fontFamily).toEqual('Roboto-Regular');
  });
});

describe('Testing h3 typography', () => {
  const normalh3 = render(<Typography element='h3'>Hello world</Typography>);
  const h3 = normalh3.toJSON()
  const stylesNormalh3 = h3.props.style;
  it('Should render', () => {
    expect(h3).toBeTruthy();
  });
  it('fontWeight bold', () => {
    expect(stylesNormalh3[2].fontWeight).toEqual('bold');
  });
  it('fontSize 20', () => {
    expect(stylesNormalh3[2].fontSize).toEqual(20);
  });
  it('fontFamily Roboto-Regular', () => {
    expect(stylesNormalh3[2].fontFamily).toEqual('Roboto-Regular');
  });
});

describe('Testing button typography', () => {
  const normalbutton = render(<Typography element='button'>Hello world</Typography>);
  const button = normalbutton.toJSON()
  const stylesNormalbutton = button.props.style;
  it('Should render', () => {
    expect(button).toBeTruthy();
  });
  it('fontWeight 500', () => {
    expect(stylesNormalbutton[2].fontWeight).toEqual('500');
  });
  it('fontSize 14', () => {
    expect(stylesNormalbutton[2].fontSize).toEqual(14);
  });
  it('fontFamily Roboto-Regular', () => {
    expect(stylesNormalbutton[2].fontFamily).toEqual('Roboto-Regular');
  });
});

describe('Testing body typography', () => {
  const normalbody = render(<Typography element='body'>Hello world</Typography>);
  const body = normalbody.toJSON()
  const stylesNormalbody = body.props.style;
  it('Should render', () => {
    expect(body).toBeTruthy();
  });
  it('fontWeight normal', () => {
    expect(stylesNormalbody[2].fontWeight).toEqual('normal');
  });
  it('fontSize 16', () => {
    expect(stylesNormalbody[2].fontSize).toEqual(16);
  });
  it('fontFamily RobotoCondensed-Regular', () => {
    expect(stylesNormalbody[2].fontFamily).toEqual('RobotoCondensed-Regular');
  });
});

describe('Testing caption typography', () => {
  const normalcaption = render(<Typography element='caption'>Hello world</Typography>);
  const caption = normalcaption.toJSON()
  const stylesNormalcaption = caption.props.style;
  it('Should render', () => {
    expect(caption).toBeTruthy();
  });
  it('fontWeight normal', () => {
    expect(stylesNormalcaption[2].fontWeight).toEqual('normal');
  });
  it('fontSize 11', () => {
    expect(stylesNormalcaption[2].fontSize).toEqual(11);
  });
  it('fontFamily RobotoCondensed-Regular', () => {
    expect(stylesNormalcaption[2].fontFamily).toEqual('RobotoCondensed-Regular');
  });
});

describe('Testing props typography', () => {
  const normalprops = render(<Typography fontSize={20} fontWeight='200' fontFamily='RobotoCondensed-Regular' color='red'>Hello world</Typography>);
  const props = normalprops.toJSON()
  const stylesNormalprops = props.props.style;
  it('Should render', () => {
    expect(props).toBeTruthy();
  });
  it('fontWeight 200', () => {
    expect(stylesNormalprops[2].fontWeight).toEqual('200');
  });
  it('fontSize 20', () => {
    expect(stylesNormalprops[2].fontSize).toEqual(20);
  });
  it('fontFamily RobotoCondensed-Regular', () => {
    expect(stylesNormalprops[2].fontFamily).toEqual('RobotoCondensed-Regular');
  });
  it('color red', () => {
    expect(stylesNormalprops[2].color).toEqual('red');
  });
});


