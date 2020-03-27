import RouteFile from './RouteFile';

test('create an instance of the class', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);

    expect(rf.routePath).toEqual("path/route");
    expect(rf.filePaths).toEqual(["path/file1", "path/file2"]);
});

test('add a path for a new file', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);
    rf.addFilePath("path/file3");
    
    expect(rf.filePaths).toEqual(["path/file1", "path/file2", "path/file3"]);
});

test('add a path for a file already saved', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2"]);

    expect.assertions(2);
    try {
        rf.addFilePath("path/file2");
        fail("Error: adding a repeated path should throw an error.");
    } catch(err) {
        expect(rf.filePaths).toEqual(["path/file1", "path/file2"]);
        expect(err.message).toEqual("The path \"path/file2\" is already in the cache.");
    }
});

test('removing an existing path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    rf.removeFilePath("path/file1");

    expect(rf.filePaths).not.toContain("path/file1");
    expect(rf.filePaths).toEqual(["path/file2", "path/file3"]);
});

test('removing non-existent path', () => {
    let rf = new RouteFile("path/route", ["path/file1", "path/file2", "path/file3"]);
    rf.removeFilePath("path/file4");

    expect(rf.filePaths).toEqual(["path/file1", "path/file2", "path/file3"]);
});