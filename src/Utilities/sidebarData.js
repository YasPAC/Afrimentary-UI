import {user, survey, note, packages} from "./adminImages";
export const menu = [
    {
      id: 1,
      title: "lists",
      listItems: [
        {
          id: 1,
          title: "Respondents",
          url: "respondents",
          icon: user,
        },
        {
          id: 2,
          title: "Researchers",
          url: "researchers",
          icon: user,
        },
        {
          id: 3,
          title: "Surveys",
          url: "surveys",
          icon: survey,
        },
        {
          id: 4,
          title: "Packages",
          url: "packages",
          icon: packages,
        },
      ],
    },
    {
        id: 2,
        title: "actions",
        listItems: [
          {
            id: 1,
            title: "Send Emails",
            url: "send_email",
            icon: note,
          },
        ]
    }
  ];