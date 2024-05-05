exports.performJoin = (results1, results2, results3) => {
    // Assuming common keys for joining are 'ID' and 'SID' in this example
    // Adjust the join conditions based on your actual schema
  
    // Step 1: Join results1 with results2 based on a common key
    const joinedResults1_2 = results1.map(row1 => {
      // Find all matching rows in results2 for the current ID in results1
      const matchingRows2 = results2.filter(row2 => row2.CID2 === row1.CID1);
      if (matchingRows2.length > 0) {
        // Merge properties from each matching row into a single object
        const mergedRows = matchingRows2.map(matchingRow2 => ({ ...row1, ...matchingRow2 }));
        return mergedRows;
      }
      return null; // No match found
    }).filter(rows => rows !== null); // Remove null entries
  
    // Flatten the array of arrays into a single array
    const flattenedJoinedResults1_2 = joinedResults1_2.flat();
  
    // Step 2: Join flattenedJoinedResults1_2 with results3 based on a common key
    const finalJoinedResults = flattenedJoinedResults1_2.map(row1_2 => {
      const matchingRow3 = results3.find(row3 => row3.CID4 === row1_2.CID3);
      if (matchingRow3) {
        // Merge properties from both rows into a single object
        return { ...row1_2, ...matchingRow3 };
      }
      return null; // No match found
    }).filter(row => row !== null);
  
    return finalJoinedResults;
  };
  