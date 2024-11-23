import React, { useState } from "react";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export default function WorkingWithModules() {
  return (
    <div id="wd-working-with-objects">
      <h3>Working With Modules</h3>
      <h4>Retrieving Modules</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Modules
      </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/name`}>
        Get Name
      </a><hr/>
      

      
    </div>
);}
