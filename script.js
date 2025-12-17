document.addEventListener('DOMContentLoaded', () => {
    // 1. 기본 정보 설정
    document.getElementById('person-name').textContent = biographyData.인물명;
    document.getElementById('era').textContent = biographyData.시대;

    // 2. 주요 호칭 및 추증 정보 생성
    const titlesContent = document.getElementById('titles-content');
    const titles = biographyData.주요_호칭_및_추증;

    // 시호 및 추증 관직
    const createTitleItem = (title, value) => {
        const item = document.createElement('div');
        item.classList.add('title-item');
        item.innerHTML = `<strong>${title}:</strong> <span>${value}</span>`;
        titlesContent.appendChild(item);
    };

    createTitleItem('시호', titles.시호);
    createTitleItem('추증 관직', titles.추증_관직);

    // 별칭
    const aliasItem = document.createElement('div');
    aliasItem.classList.add('title-item');
    aliasItem.innerHTML = `<strong>별칭:</strong> <span>${titles.별칭.join(', ')}</span>`;
    titlesContent.appendChild(aliasItem);


    // 3. 생애 연대기 카드 생성
    const timelineContainer = document.getElementById('timeline-container');

    biographyData.생애_구분.forEach(section => {
        const card = document.createElement('div');
        card.classList.add('timeline-card');
        card.innerHTML = `
            <div class="card-header">
                <h3>${section.제목}</h3>
                <span class="card-period">${section.시기}</span>
                <span class="toggle-icon">▼</span>
            </div>
            <div class="card-details hidden">
                <ul>
                    ${section.세부_내용.map(detail => `
                        <li>
                            <strong>${detail.항목}:</strong> ${detail.내용} 
                            ${detail.출처 ? `<span class="source">(${detail.출처})</span>` : ''}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;

        // 클릭 이벤트 리스너 추가 (토글 기능)
        card.querySelector('.card-header').addEventListener('click', () => {
            const details = card.querySelector('.card-details');
            const icon = card.querySelector('.toggle-icon');

            details.classList.toggle('hidden');
            icon.textContent = details.classList.contains('hidden') ? '▼' : '▲';
            card.classList.toggle('expanded');
        });

        timelineContainer.appendChild(card);
    });
});