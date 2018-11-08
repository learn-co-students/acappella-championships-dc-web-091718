const FETCH_URL = "http://localhost:3000/a_cappella_groups"
const store = {groups: []}

function winnerTable() {
  return document.querySelector('#table-body')
}

function winnerArea() {
  return document.querySelector('#winner')
}

function crownWinner(event) {
  let oldWinner

  if(winnerArea().children[0]) {
    let oldWinnerId = parseInt(winnerArea().children[0].dataset.id)
    oldWinner = store.groups.find(group => group.id === oldWinnerId)
    winnerTable().appendChild(groupRow(oldWinner))
    winnerArea().lastChild.remove()
  }
  

  event.target.parentElement.parentElement.remove()
  winnerArea().append(renderWinner(this))

  winnerTable().appendChild(groupRow())
}

function renderWinner(group) {
  let winner = document.createElement('h3')
  winner.innerText = group.name
  winner.dataset.id = group.id

  return winner
}

function goFetch() {
  fetch(FETCH_URL)
    .then(response => response.json())
    .then(groups => renderGroups(groups))
}

function renderGroups(groups) {
  for(const group of groups) {
    winnerTable().appendChild(groupRow(group))
  } 
}

function deleteGroup() {
  targetRow = document.querySelector(`#group-${this.id}`)

  fetch(FETCH_URL + `/${this.id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .then(() => {
      targetRow.remove()
    })
}

function groupRow(group) {
  store.groups.push(group)

  let row = document.createElement('tr')
  row.id = `group-${group.id}`

  let college = document.createElement('td')
  college.innerText = group.college.name

  let groupName = document.createElement('td')
  groupName.innerText = group.name

  let membership = document.createElement('td')
  membership.innerText = group.membership

  let division = document.createElement('td')
  division.innerText = group.college.division

  let crown = document.createElement('td')
  let crownImage = document.createElement('img')
  crownImage.src = './assets/trophy.png'
  crownImage.dataset.id = group.id
  crownImage.addEventListener('click', crownWinner.bind(group))

  let deleteButtonCol = document.createElement('td')
  let deleteButton = document.createElement('button')
  deleteButton.innerText = "Delete"
  deleteButton.addEventListener('click', deleteGroup.bind(group))

  deleteButtonCol.appendChild(deleteButton)

  crown.appendChild(crownImage)

  row.appendChild(college)
  row.appendChild(groupName)
  row.appendChild(membership)
  row.appendChild(division)
  row.appendChild(crown)
  row.appendChild(deleteButtonCol)
  return row
}

document.addEventListener('DOMContentLoaded', () => {
  goFetch()
})