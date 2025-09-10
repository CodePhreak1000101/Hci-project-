// src/mockData.js
import { save } from './utils/storage'
import { uid } from './utils/helpers'

const seedIfEmpty = () => {
  if (!localStorage.getItem('studybuddy_init')) {
    const users = [
      { id: uid('u_'), name: 'Student One', email: 'student1@university.edu', avatar: 'A', joinedGroups: [] },
      { id: uid('u_'), name: 'Student Two', email: 'student2@university.edu', avatar: 'B', joinedGroups: [] },
      { id: uid('u_'), name: 'Student Three', email: 'student3@university.edu', avatar: 'C', joinedGroups: [] },
    ]

    const groups = [
      {
        id: uid('g_'),
        name: 'Math Study Group',
        icon: 'book',
        members: [users[0].email, users[1].email],
        topics: [
          { id: uid('t_'), title: 'Math Chapter 1', covered: true },
          { id: uid('t_'), title: 'Calculus Intro', covered: false },
          { id: uid('t_'), title: 'Practice Problems', covered: false },
        ],
        messages: [
          { id: uid('m_'), sender: users[0].email, type: 'text', text: 'Welcome to Math group!', time: Date.now() - 1000 * 60 * 60 },
          // sample image/message placeholders
        ]
      },
      {
        id: uid('g_'),
        name: 'Physics Buddies',
        icon: 'atom',
        members: [users[0].email, users[2].email],
        topics: [
          { id: uid('t_'), title: 'Physics Intro', covered: true },
          { id: uid('t_'), title: 'Lab Safety', covered: true },
          { id: uid('t_'), title: 'Motion & Forces', covered: false },
        ],
        messages: [
          { id: uid('m_'), sender: users[2].email, type: 'text', text: 'Who will present Chapter 2?', time: Date.now() - 1000 * 60 * 30 }
        ]
      }
    ]

    // link groups to users
    users[0].joinedGroups = [groups[0].id, groups[1].id]
    users[1].joinedGroups = [groups[0].id]
    users[2].joinedGroups = [groups[1].id]

    save('studybuddy_users', users)
    save('studybuddy_groups', groups)
    save('studybuddy_currentUserEmail', users[0].email)
    localStorage.setItem('studybuddy_init', '1')
    console.log('StudyBuddy mock data seeded')
  }
}

seedIfEmpty()
