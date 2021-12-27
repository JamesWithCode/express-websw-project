//프로그램명 받아오기
const programListHidden = document.getElementById("programListHidden")
if(programListHidden){
    const programInputHidden = document.getElementById("programData")
    const programData=JSON.parse(programInputHidden.value)
    console.log("programData : ",programData)
    
    const body = document.querySelector('.main');
    const totalBtn = document.querySelector('.total');
    const categoryBtn = document.querySelector('.category');
    const programListContainer = document.createElement('div');
    programListContainer.classList.add('programListContainer');
    body.appendChild(programListContainer);
    const titles = document.querySelectorAll('.title');
    programListContainer.appendChild(titles[0]);
    programListContainer.appendChild(titles[1]);
    programListContainer.appendChild(titles[2]);
    let titleHeight = parseInt(getStyle(titles[0], "height", "height"));
    
    function createProgramList(obj) {
        let currentRow = 0; // 현재 행
        let currentCol = 0; // 현재 열
        let tripKey = 0;
        let tripRow = 0;
        let tripCol = 0;
        let activityKey = 0;
        let activityRow = 0;
        let activityCol = 0;
        let trainingKey = 0;
        let trainingRow = 0;
        let trainingCol = 0;
        let tripLen = 0;
        let activityLen = 0;
        let trainingLen = 0;
        let totalTripRow = 0;
        let totalActivityRow = 0;
        let totaltrainingRow = 0;
        
    
        for (let i = 0; i < obj.length; i++) {
            if (obj[i].category == 'trip') tripLen++;
            else if (obj[i].category == 'activity') activityLen++;
            else if (obj[i].category == 'training') trainingLen++;
        }
    
        for (let key in obj) {
            const program = document.createElement('div');
            program.classList.add('program');
            program.dataset.key = key;
            //console.log(key);
            const programImg = document.createElement('img');
            programImg.classList.add('programImgg');
            programImg.style.content = "url(" + obj[key].photoUrls[0] + ")";
    
    
    
            const programTitle = document.createElement('div');
            programTitle.classList.add('programTitle');
            programTitle.innerHTML = obj[key].title;
    
    
            program.appendChild(programImg);
            program.appendChild(programTitle);
            programListContainer.appendChild(program);
    
            program.addEventListener('click', (e) => {
    
                console.log(obj[e.currentTarget.dataset.key].title);
                localStorage.setItem('programData', JSON.stringify(obj[e.currentTarget.dataset.key]));
                location.href = `programs/id가 들어갈 자리`;
            });
    
            let imgWidth = parseInt(getStyle(program, "width", "width"));
            let imgHeight = parseInt(getStyle(program, "height", "height"));
            let containerWidth = parseInt(getStyle(programListContainer, "width", "width"));
            let rowNum = Math.floor(containerWidth / imgWidth); //  한줄에 들어가는 프로그램 수
            totalTripRow = Math.ceil(tripLen / rowNum);    // 여행 전체 행
            totalActivityRow = Math.ceil(activityLen / rowNum);    // activity 전체 행
            totaltrainingRow = Math.ceil(trainingLen / rowNum);    // training 전체 행
    
            //console.log(rowNum);
            let pastRow = currentRow;   // 이전 행
            currentRow = Math.floor(key / rowNum);
            
    
            if (pastRow == currentRow) { // 이전 행하고 현재 행하고 같으면 같은 행이라는 이야기
                currentCol = Math.floor(key % rowNum);
                program.dataset.totalX = imgWidth * currentCol + (20 * currentCol);
                program.dataset.totalY = imgHeight * currentRow + (20 * currentRow);
                console.log(imgHeight);
    
                program.style.transform = `translate( ${program.dataset.totalX}px, ${program.dataset.totalY}px)`;
                //console.log(Math.floor(currentCol));
            }
            else {
                currentCol = 0; 
                program.dataset.totalX = imgWidth * currentCol;
                program.dataset.totalY = imgHeight * currentRow + (20 * currentRow);
                program.style.transform = `translate( ${program.dataset.totalX}px, ${program.dataset.totalY}px)`;
            }
    
            // 카테고리별 분류/////////////////////
            if (obj[key].category == 'trip') {
                program.dataset.category = 'trip';
                
                let pastTripRow = tripRow; // 이전 여행 행
                tripRow = Math.floor(tripKey / rowNum); // 여행 카테고리 현재 행
    
                if (pastTripRow == tripRow) { // 이전 행하고 현재 행하고 같으면 같은 행이라는 이야기
                    tripCol = Math.floor(tripKey % rowNum);
                    program.dataset.tripX = imgWidth * tripCol + (20 * tripCol);
                    program.dataset.tripY = imgHeight * tripRow + (20 * tripRow);
                    //console.log(imgWidth * tripCol + (20 * tripCol), imgHeight * tripRow + (20 * tripRow));
                    if (tripKey == 0) {
                        titles[0].dataset.tripY = program.dataset.tripY;
                        //console.log(imgWidth * tripCol + (20 * tripCol), imgHeight * tripRow + (20 * tripRow));
                    }
                    //program.style.transform = `translate( ${program.dataset.tripX}px, ${program.dataset.tripY}px)`;
                    //console.log(Math.floor(currentCol));
                }
                else {
                    tripCol = 0; 
                    program.dataset.tripX = imgWidth * tripCol;
                    program.dataset.tripY = imgHeight * tripRow + (20 * tripRow);
                    //program.style.transform = `translate( ${program.dataset.tripX}px, ${program.dataset.tripY}px)`;
                }
                tripKey++;
            }
            else if (obj[key].category == 'activity') {
                program.dataset.category = 'activity';
                let pastActivityRow = activityRow; // 이전 여행 행
                activityRow = Math.floor(activityKey / rowNum); // 여행 카테고리 현재 행
                
    
                if (pastActivityRow == activityRow) { // 이전 행하고 현재 행하고 같으면 같은 행이라는 이야기
                    activityCol = Math.floor(activityKey % rowNum);
                    program.dataset.activityX = imgWidth * activityCol + (20 * activityCol);
                    program.dataset.activityY = imgHeight * activityRow + (20 * activityRow) + imgHeight * totalTripRow + 100;
        
                    if (activityKey == 0) {
                        titles[1].dataset.activityY = program.dataset.activityY;
                        //console.log(imgWidth * tripCol + (20 * tripCol), imgHeight * tripRow + (20 * tripRow));
                    }
                    //program.style.transform = `translate( ${program.dataset.activityX}px, ${program.dataset.activityY}px)`;
                    //console.log(Math.floor(currentCol));
                }
                else {
                    activityCol = 0; 
                    program.dataset.activityX = imgWidth * activityCol;
                    program.dataset.activityY = imgHeight * activityRow + (20 * activityRow) + imgHeight * totalTripRow + 100;
                    //program.style.transform = `translate( ${program.dataset.activityX}px, ${program.dataset.activityY}px)`;
                }
                activityKey++;
            }
            else if (obj[key].category == 'training') {
                program.dataset.category = 'training';
                let pastTrainingRow = trainingRow; // 이전 여행 행
                trainingRow = Math.floor(trainingKey / rowNum); // 여행 카테고리 현재 행
                
    
                if (pastTrainingRow == trainingRow) { // 이전 행하고 현재 행하고 같으면 같은 행이라는 이야기
                    trainingCol = Math.floor(trainingKey % rowNum);
                    program.dataset.trainingX = imgWidth * trainingCol + (20 * trainingCol);
                    program.dataset.trainingY = imgHeight * trainingRow + (20 * trainingRow) + imgHeight * totalTripRow + 100 + imgHeight * totalActivityRow + 100;
        
                    if (trainingKey == 0) {
                        titles[2].dataset.trainingY = program.dataset.trainingY;
                        //console.log(imgWidth * tripCol + (20 * tripCol), imgHeight * tripRow + (20 * tripRow));
                    }
                    //program.style.transform = `translate( ${program.dataset.tripX}px, ${program.dataset.tripY}px)`;
                    //console.log(Math.floor(currentCol));
                }
                else {
                    trainingCol = 0; 
                    program.dataset.trainingX = imgWidth * trainingCol;
                    program.dataset.trainingY = imgHeight * trainingRow + (20 * trainingRow) + imgHeight * totalTripRow + 100 + imgHeight * totalActivityRow + 100;
                    //program.style.transform = `translate( ${program.dataset.trainingX}px, ${program.dataset.trainingY}px)`;
                }
                trainingKey++;
            }
            
            
        }
    }
    
    totalBtn.classList.add('active');
    totalBtn.addEventListener('click', ()=>{ 
        titles[0].style.opacity = '0';
        titles[1].style.opacity = '0';
        titles[2].style.opacity = '0';
        totalBtn.classList.add('active');
        categoryBtn.classList.remove('active');
    
        const programs = document.querySelectorAll('.program');
    
        //console.log(programs.length);
        for(let i = 0; i < programs.length; i++) {
            programs[i].style.transform = `translate( ${programs[i].dataset.totalX}px, ${programs[i].dataset.totalY}px)`;
        }
                
    });
    
    categoryBtn.addEventListener('click', ()=>{ 
        categoryBtn.classList.add('active');
        totalBtn.classList.remove('active');
    
        const programs = document.querySelectorAll('.program');
    
        //console.log(programs.length);
        titles[0].style.opacity = '1';
        titles[1].style.opacity = '1';
        titles[2].style.opacity = '1';
        
        titles[0].style.transform = `translate(0px, ${titles[0].dataset.tripY - titleHeight - 10}px)`;
        titles[1].style.transform = `translate(0px, ${titles[1].dataset.activityY - titleHeight - 10}px)`;
        titles[2].style.transform = `translate(0px, ${titles[2].dataset.trainingY - titleHeight - 10}px)`;
    
        console.log(titles[1]);
        for(let i = 0; i < programs.length; i++) {
            if (programs[i].dataset.category == 'trip') {
                programs[i].style.transform = `translate( ${programs[i].dataset.tripX}px, ${programs[i].dataset.tripY}px)`;
            }
            else if (programs[i].dataset.category == 'activity') {
                programs[i].style.transform = `translate( ${programs[i].dataset.activityX}px, ${programs[i].dataset.activityY}px)`;
            }
            else if (programs[i].dataset.category == 'training') {
                programs[i].style.transform = `translate( ${programs[i].dataset.trainingX}px, ${programs[i].dataset.trainingY}px)`;
            }
        }
                
    });
    
    
    
    function getStyle(elem, cssprop, cssprop2) {
    
        //IE
        if (elem.currentStyle) {
            return elem.currentStyle[cssprop];
    
            //다른 브라우저    
        } else if (document.defaultView && document.defaultView.getComputedStyle) {
            return document.defaultView.getComputedStyle(elem, null).getPropertyValue(cssprop2);
    
            //대비책    
        } else {
            return null;
        }
    }
    
    createProgramList(programData);
}