import axios from "axios";
import { useEffect, useState } from "react";

const ReleaseAutomation = () => {

    const [groups, setGroups] = useState([]);

  useEffect(() => {
    console.log("groupsin the state", groups)
  }, [groups])

  useEffect(() => {
    getRootGroups(65102204);
  }, [])

  const getRootGroups = (rootLevelGroupID: any) => {
    axios
      .get(`https://gitlab.com/api/v4/groups/${rootLevelGroupID}/subgroups`, {
        headers: { "PRIVATE-TOKEN": "glpat-sZRh1-unEoJDJP9snryZ" },
      })
      .then((response) => {
        // check if there are any groups available
        if (response.data.length > 0) {
          // Set the groups state with the response data
          // @ts-ignore
          setGroups([...response.data]);

          // Call getSubGroups here in the .then() block to ensure that groups state is updated
          getSubGroups(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching root groups:", error);
      });
  };

  const getSubGroups = (parentGroups: any) => {
    parentGroups.forEach((parentGroup: any) => {
      axios
        .get(`https://gitlab.com/api/v4/groups/${parentGroup.id}/subgroups`, {
          headers: { "PRIVATE-TOKEN": "glpat-sZRh1-unEoJDJP9snryZ" },
        })
        .then((response) => {
          console.log("subgroups", response.data);
          // check if there are any groups available
          if (response.data.length > 0) {
            // Find the index of the parent group in the groups array
            const groupIndex = groups.findIndex(
              (group:any) => group.id === parentGroup.id
            );

            if (groupIndex !== -1) {
              // Create a new object with the updated subgroups
              const updatedGroup = {
                  //@ts-ignore
                ...groups[groupIndex], // Copying the existing properties of the current state
                subGroups: response.data,
              };

              // Update the state with the updated group
              setGroups((previousGroups) => {
                  const updatedGroups = [...previousGroups];
                  //@ts-ignore
                updatedGroups[groupIndex] = updatedGroup;
                return updatedGroups;
              });
            }
          }

        })
        .catch((error) => {
          console.error("Error fetching subgroups:", error);
        });
    });
  }; 

  const displayData = () => {
    console.log(groups)
    groups.forEach(group => {
      console.log(group)
    })
  }

    return (
        <div>
        <button onClick={displayData}>display data</button>
      </div>
    )
}

export default ReleaseAutomation;