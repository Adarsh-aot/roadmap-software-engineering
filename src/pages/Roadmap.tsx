import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";

interface WeeklyContent {
  week: number;
  title: string;
  topics: string[];
  practicalTasks: string[];
}

interface Topic {
  id: string;
  title: string;
  weeks: WeeklyContent[];
}

const monthlyTopics: Topic[] = [
  {
    id: "month1",
    title: "Month 1: Basic Web Server Knowledge",
    weeks: [
      {
        week: 1,
        title: "Introduction to Web Servers",
        topics: [
          "HTTP/HTTPS protocols",
          "Web server architecture",
          "Server types comparison",
          "Basic server security"
        ],
        practicalTasks: [
          "Install Apache on local machine",
          "Configure basic settings",
          "Host a static website",
          "Set up server logs"
        ]
      },
      {
        week: 2,
        title: "NGINX Configuration",
        topics: [
          "NGINX architecture",
          "Load balancing concepts",
          "Reverse proxy setup",
          "SSL/TLS implementation"
        ],
        practicalTasks: [
          "Install and configure NGINX",
          "Set up reverse proxy",
          "Implement load balancing",
          "Configure SSL certificates"
        ]
      },
      {
        week: 3,
        title: "Apache Advanced Features",
        topics: [
          "Virtual hosts",
          "Apache modules",
          "URL rewriting",
          "Security configurations"
        ],
        practicalTasks: [
          "Configure virtual hosts",
          "Implement mod_rewrite rules",
          "Set up authentication",
          "Optimize Apache performance"
        ]
      },
      {
        week: 4,
        title: "Tomcat Server",
        topics: [
          "Java application servers",
          "WAR deployment",
          "Tomcat architecture",
          "Performance tuning"
        ],
        practicalTasks: [
          "Install Tomcat",
          "Deploy sample application",
          "Configure server.xml",
          "Set up monitoring"
        ]
      }
    ]
  },
  {
    id: "month2",
    title: "Month 2: Linux Process Management",
    weeks: [
      {
        week: 5,
        title: "Process Management Basics",
        topics: [
          "Process lifecycle",
          "Process states",
          "Process scheduling",
          "Resource management"
        ],
        practicalTasks: [
          "Use process monitoring tools",
          "Manage process priorities",
          "Handle process signals",
          "System resource monitoring"
        ]
      },
      {
        week: 6,
        title: "System Monitoring and Logging",
        topics: [
          "Monitoring tools overview",
          "Log management",
          "Performance metrics",
          "Alert systems"
        ],
        practicalTasks: [
          "Configure system logging",
          "Set up monitoring tools",
          "Create alert rules",
          "Log rotation setup"
        ]
      },
      {
        week: 7,
        title: "Scheduled Processes",
        topics: [
          "Cron jobs",
          "Systemd timers",
          "Job scheduling",
          "Automation scripts"
        ],
        practicalTasks: [
          "Create cron jobs",
          "Write automation scripts",
          "Configure systemd timers",
          "Monitor scheduled tasks"
        ]
      }
    ]
  },
  {
    id: "month3",
    title: "Month 3: Version Control Systems",
    weeks: [
      {
        week: 8,
        title: "Introduction to VCS, CVCS, DVCS",
        topics: [
          "Version control concepts",
          "Centralized vs. distributed",
          "Basic Git commands",
          "Branching strategies"
        ],
        practicalTasks: [
          "Initialize a Git repository",
          "Create branches",
          "Merge branches",
          "Resolve merge conflicts"
        ]
      },
      {
        week: 9,
        title: "Advanced Git Features",
        topics: [
          "Rebasing",
          "Cherry-picking",
          "Stashing",
          "Tagging"
        ],
        practicalTasks: [
          "Use rebase to clean history",
          "Cherry-pick commits",
          "Stash changes",
          "Create and manage tags"
        ]
      },
      {
        week: 10,
        title: "Collaborative Work with Git",
        topics: [
          "Pull requests",
          "Code reviews",
          "Git workflows",
          "Using GitHub/GitLab"
        ],
        practicalTasks: [
          "Create a pull request",
          "Review code",
          "Implement a workflow",
          "Collaborate on a project"
        ]
      }
    ]
  },
  {
    id: "month4",
    title: "Month 4: Build and Deployment Tools",
    weeks: [
      {
        week: 11,
        title: "Introduction to Build Tools",
        topics: [
          "Build automation concepts",
          "Common build tools",
          "Build scripts",
          "Continuous integration"
        ],
        practicalTasks: [
          "Set up a build tool",
          "Create a build script",
          "Integrate with CI/CD",
          "Automate testing"
        ]
      },
      {
        week: 12,
        title: "Docker Basics",
        topics: [
          "Containerization concepts",
          "Docker architecture",
          "Creating Docker images",
          "Docker networking"
        ],
        practicalTasks: [
          "Install Docker",
          "Create a Dockerfile",
          "Build and run containers",
          "Manage Docker networks"
        ]
      },
      {
        week: 13,
        title: "Jenkins for CI/CD",
        topics: [
          "Jenkins architecture",
          "Pipeline as code",
          "Integrating with Git",
          "Deploying applications"
        ],
        practicalTasks: [
          "Set up a Jenkins server",
          "Create a Jenkins pipeline",
          "Integrate with GitHub",
          "Deploy a sample application"
        ]
      }
    ]
  },
  {
    id: "month5",
    title: "Month 5: Configuration Management and IAC",
    weeks: [
      {
        week: 14,
        title: "Ansible Basics",
        topics: [
          "Configuration management concepts",
          "Ansible architecture",
          "Playbooks and roles",
          "Inventory management"
        ],
        practicalTasks: [
          "Install Ansible",
          "Write a simple playbook",
          "Manage inventory",
          "Automate server setup"
        ]
      },
      {
        week: 15,
        title: "Chef and Puppet",
        topics: [
          "Overview of Chef and Puppet",
          "Configuration management with Chef",
          "Puppet manifests",
          "Comparing tools"
        ],
        practicalTasks: [
          "Set up a Chef server",
          "Write a Chef recipe",
          "Create Puppet manifests",
          "Manage configurations"
        ]
      },
      {
        week: 16,
        title: "Terraform for IAC",
        topics: [
          "Infrastructure as code concepts",
          "Terraform architecture",
          "Writing Terraform configurations",
          "Managing state"
        ],
        practicalTasks: [
          "Install Terraform",
          "Write a simple configuration",
          "Manage infrastructure",
          "Use remote state"
        ]
      },
      {
        week: 17,
        title: "Cloud Formation and ARM Templates",
        topics: [
          "AWS CloudFormation basics",
          "Azure Resource Manager templates",
          "Infrastructure provisioning",
          "Best practices"
        ],
        practicalTasks: [
          "Create a CloudFormation stack",
          "Write an ARM template",
          "Provision resources",
          "Manage stacks"
        ]
      }
    ]
  },
  {
    id: "month6",
    title: "Month 6: Cloud Platforms",
    weeks: [
      {
        week: 18,
        title: "AWS Core Services",
        topics: [
          "Overview of AWS services",
          "EC2, S3, RDS",
          "IAM and security",
          "Networking in AWS"
        ],
        practicalTasks: [
          "Launch an EC2 instance",
          "Create an S3 bucket",
          "Set up RDS",
          "Configure IAM roles"
        ]
      },
      {
        week: 19,
        title: "Serverless Computing",
        topics: [
          "Introduction to serverless",
          "AWS Lambda",
          "API Gateway",
          "Event-driven architecture"
        ],
        practicalTasks: [
          "Create a Lambda function",
          "Set up API Gateway",
          "Integrate with other services",
          "Monitor serverless applications"
        ]
      },
      {
        week: 20,
        title: "AWS DevOps Tools",
        topics: [
          "Overview of AWS DevOps tools",
          "CodePipeline, CodeBuild",
          "CloudWatch",
          "Elastic Beanstalk"
        ],
        practicalTasks: [
          "Set up a CodePipeline",
          "Create a build project",
          "Monitor applications with CloudWatch",
          "Deploy with Elastic Beanstalk"
        ]
      },
      {
        week: 21,
        title: "Database as a Service",
        topics: [
          "Overview of DBaaS",
          "Managed databases",
          "Scaling databases",
          "Backup and recovery"
        ],
        practicalTasks: [
          "Set up a managed database",
          "Configure backups",
          "Scale database instances",
          "Monitor performance"
        ]
      },
      {
        week: 22,
        title: "Multi-Cloud Strategy",
        topics: [
          "Benefits of multi-cloud",
          "Challenges and considerations",
          "Integrating services",
          "Cost management"
        ],
        practicalTasks: [
          "Design a multi-cloud architecture",
          "Implement service integration",
          "Monitor costs",
          "Evaluate performance"
        ]
      }
    ]
  }
];

const Roadmap = () => {
  const [progress, setProgress] = useState<Record<string, boolean>>({});
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const storedUsername = localStorage.getItem("username");
    
    if (!isAuthenticated) {
      navigate("/");
      return;
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }

    const savedProgress = localStorage.getItem("progress");
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [navigate]);

  const handleCheckboxChange = (topicId: string, weekNum: number, item: string, type: 'topic' | 'task') => {
    const key = `${topicId}-week${weekNum}-${type}-${item}`;
    const newProgress = { ...progress, [key]: !progress[key] };
    setProgress(newProgress);
    localStorage.setItem("progress", JSON.stringify(newProgress));

    if (!progress[key]) {
      toast({
        title: "Progress Updated",
        description: `${type === 'topic' ? 'Topic' : 'Task'} marked as completed!`,
        duration: 2000,
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    navigate("/");
  };

  const calculateProgress = () => {
    const totalItems = monthlyTopics.reduce((acc, month) => {
      return acc + month.weeks.reduce((weekAcc, week) => {
        return weekAcc + week.topics.length + week.practicalTasks.length;
      }, 0);
    }, 0);
    
    const completedItems = Object.values(progress).filter(Boolean).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Learning Roadmap</h1>
            <p className="text-gray-600">Welcome back, {username}!</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Overall Progress</span>
              <span className="text-2xl font-bold text-blue-600">{calculateProgress()}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[calc(100vh-200px)]">
          <div className="space-y-6">
            {monthlyTopics.map((month) => (
              <Card key={month.id}>
                <CardHeader>
                  <CardTitle className="text-xl">{month.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {month.weeks.map((week) => (
                      <Collapsible key={`${month.id}-week${week.week}`}>
                        <CollapsibleTrigger className="flex items-center w-full text-left font-medium hover:bg-gray-50 p-2 rounded">
                          {({ open }) => (
                            <>
                              {open ? <ChevronDown className="h-4 w-4 mr-2" /> : <ChevronRight className="h-4 w-4 mr-2" />}
                              Week {week.week}: {week.title}
                            </>
                          )}
                        </CollapsibleTrigger>
                        <CollapsibleContent className="pl-6 space-y-4 mt-2">
                          <div>
                            <h4 className="font-medium mb-2">Learning Topics:</h4>
                            {week.topics.map((topic) => (
                              <div key={`${month.id}-week${week.week}-topic-${topic}`} className="flex items-start space-x-3 mb-2">
                                <Checkbox
                                  id={`${month.id}-week${week.week}-topic-${topic}`}
                                  checked={progress[`${month.id}-week${week.week}-topic-${topic}`] || false}
                                  onCheckedChange={() => handleCheckboxChange(month.id, week.week, topic, 'topic')}
                                />
                                <label
                                  htmlFor={`${month.id}-week${week.week}-topic-${topic}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {topic}
                                </label>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Practical Tasks:</h4>
                            {week.practicalTasks.map((task) => (
                              <div key={`${month.id}-week${week.week}-task-${task}`} className="flex items-start space-x-3 mb-2">
                                <Checkbox
                                  id={`${month.id}-week${week.week}-task-${task}`}
                                  checked={progress[`${month.id}-week${week.week}-task-${task}`] || false}
                                  onCheckedChange={() => handleCheckboxChange(month.id, week.week, task, 'task')}
                                />
                                <label
                                  htmlFor={`${month.id}-week${week.week}-task-${task}`}
                                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                  {task}
                                </label>
                              </div>
                            ))}
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Roadmap;
