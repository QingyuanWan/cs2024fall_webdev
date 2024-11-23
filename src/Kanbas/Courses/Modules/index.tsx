import { useParams } from "react-router";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useState, useEffect, useCallback } from "react";

import { BsGripVertical } from "react-icons/bs";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
import * as coursesClient from "../client";
import * as modulesClient from "./client";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  const fetchModules = useCallback(async () => {
    try {
      const modules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(modules));
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  }, [cid, dispatch]);

  useEffect(() => {
    fetchModules();
  }, [fetchModules]);

    return (
      <div>
   {currentUser.role === "FACULTY" && (
   <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
   addModule={createModuleForCourse} />
        )}
   <br /><br /><br /><br />

        <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary">
              <BsGripVertical className="me-2 fs-3" /> 
              
              {!module.editing && module.name}
              { module.editing && currentUser.role === "FACULTY" && (
                  <input className="form-control w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                    }}
                    defaultValue={module.name} />
                )}

                {currentUser.role === "FACULTY" && (
                <ModuleControlButtons moduleId={module._id}
                deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={(moduleId) => dispatch(editModule(moduleId))} />
                )}
                  
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>



      </div>
  );}
  