import React, {Component} from "react";
import CustomLoader from "./CustomLoader";
import Adapter from "enzyme-adapter-react-16";
import Enzyme, { shallow, mount } from "enzyme";

Enzyme.configure({ adapter: new Adapter() });

test("CustomLoader",()=>{
    expect(CustomLoader).toBeDefined();
});

