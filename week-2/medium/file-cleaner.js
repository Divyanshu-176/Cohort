## File cleaner
Read a file, remove all the extra spaces and write it back to the same file.

For example, if the file input was
```
hello     world    my    name   is       raman
```

After the program runs, the output should be

```
hello world my name is raman
```







const fs=require('fs');

let cleanStr='';

fs.readFile('./abc.txt', {encoding:'utf-8'}, (err,data)=>{
    if (err){
        throw err;
    }

    cleanStr = data.split(/\s+/).join(" ");
    console.log(cleanStr);

    fs.writeFile('./abc.txt', cleanStr,(err)=>{
        if(err) throw err;
    })
})



