import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PeopleTable from "./Table";
import * as client from "../client";

export default function PeopleIndex() {
  const [users, setUsers] = useState<any[]>([]);
  const { cid } = useParams();

  const fetchUsers = async () => {
    if (!cid) return;
    const users = await client.findUsersForCourse(cid);
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div>
      <h3>Users in Course {cid}</h3>
      <PeopleTable users={users} />
    </div>
  );
}