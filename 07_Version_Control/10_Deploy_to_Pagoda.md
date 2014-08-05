So far, you've got the flow set up between your local computer and your repo at Github, but there's one more piece of the puzzle: deploying your changes to your live server.

In this section we'll look at an example of how you would deploy to a **PaaS** (Platform as a Service) which is just one kind of server you might use to publish work online. 

In this doc we'll use [PagodaBox](https://pagodabox.com/).

[Read more on the difference between a PaaS and traditional/shared hosting...](http://www.brmullikin.com/web-development).




## Pagoda setup
Create a new account at [PagodaBox](https://pagodabox.com/).

In your user settings, find the option to add a SSH key. You can copy the same `id_rsa.pub` key you created when you configured Github.

Mac: 

```bash
$ cat /Users/YourName/.ssh/id_rsa.pub
```

Windows:

```bash
$ cat C:\Users\YourName\.ssh\id_rsa.pub
```
	
<img src='http://making-the-internet.s3.amazonaws.com/vc-pagoda-add-ssh-key@2x.png' class='' style='max-width:1113px; width:75%' alt=''>

<small>
Note: Instead of using your Github key, you could have generated a unique one for Pagoda. This latter technique is more secure and suggested for projects beyond the scope of this class.
</small>




## New Pagoda App
From your Pagoda dashboard, find the option to **add a New Application**.

Start your app with an **Empty Repo**. Give your new app a name; you can't call it `hello-world` because it'll already be taken by another user on Pagoda, so try adding your name or some other unique value.

Click **Launch Application** to initiate your new app.

<img src='http://making-the-internet.s3.amazonaws.com/vc-new-app-on-pagoda@2x.png' class='' style='max-width:981px; width:75%' alt=''>

On the next screen, choose Git as your deployment method. Pagoda will also give you a series of CL commands. Because your repository is already initiated you only need to run the 4th line which will add Pagoda as a new remote.

<img src='http://making-the-internet.s3.amazonaws.com/vc-pagoda-choose-deployment-method@2x.png' class='' style='max-width:541px; width:75%' alt=''>

```bash
$ git remote add pagoda git@git.pagodabox.com:hello-world-yourname.git
```





## Deploying

The final step is to push to Pagoda, which is what you'll do whenever you have changes you're ready to go live with changes.

```bash
$ git push pagoda master
```

<img src='http://making-the-internet.s3.amazonaws.com/vc-git-push-pagoda-master@2x.png' class='' style='max-width:582px; width:75%' alt=''>

After your first deployment, you should now be able to access your app via `http://app-name.gopagoda.com`. You can also manage your app from its dashboard on Pagoda.