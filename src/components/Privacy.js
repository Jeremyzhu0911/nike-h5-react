import React from 'react';
import cookie from "react-cookies";

const Priacy = () => {
    return (
        <div className={"Priacy"}>
            <div className={"Priacy_box"}>
            <h2>隐私政策</h2>
            <p>耐克体育（中国）有限公司和{cookie.load("store_name")}负责收集，处理和存储从耐克商业合作伙伴 (NSP)
                微信公众号（“{cookie.load("store_name")}”）获取的您的个人信息。</p>
            <p>收集和使用个人信息</p>
            <p>当您访问服公众号时，我们收集并处理您提交或我们可能要求的个人信息，包括您的姓名、手机号码、行为信息以及可能提交的其他信息。</p>
            <p>共享信息</p>
            <p>耐克体育（中国）有限公司和{cookie.load("store_name")}共享我们通过微信公众号获取的您的个人信息，以使我们能够履行您通过公众号预约的服务。</p>
            <p>我们通过公众号和网站收集的个人信息也会与代表我们履行服务或执行其他工作的其他第三方共享。这些第三方将代表我们并按照我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理您的个人信息。</p>
            <p>我们也可能依政府的要求、法院命令、在法律规定情况下或为了保护我们或其他人的权利、财产或安全时，披露您的个人信息。我们还可能为了避免违法使用服务账号或避免违反使用条款或应对第三方主张而共享信息。</p>
            <p>我们不会出于营销目的向代理公司或外部公司提供您的个人信息，也不会向本政策载明之外的任何外部方销售、买卖、分享或传输您的个人信息。</p>
            <p>您的个人信息权利</p>
            <p>
                您有权要求：(i) 访问您的个人信息；(ii) 获取您个人信息的电子复本（便携性）；(iii) 如不全或有误，更正您的个人信息；或 (iv)
                在适用法律规定的某些情况下，删除您的个人信息。前述权利不是绝对的。如果我们已获得了您对处理您个人信息的同意，您有权随时撤销该同意。
            </p>
            <p>您可通过公众号下方的“我的服务”(My Service)按钮来访问及修改您的信息。如需获取更多信息或行使前述权利，您也可通过服务账号下方的“在线客户服务”(Online Client Service)
                按钮来联系我们的客户服务团队。
            </p>
            <p>保密和保护 </p>
            <p>公众号及管理平台使用一系列安全技术和程序来保护您的个人信息免遭未授权访问、使用和披露。公众号收集的个人信息存储在公众无法访问的安全环境中。</p>
            <p>我们隐私政策的修改</p>
            <p>如果我们决定修改我们的隐私政策，我们将在公众号上发布修改后的政策。建议您定期查看我们的隐私政策是否有修改。如果我们对我们处理您个人信息的方式做出了重大修改，我们将提前通知您；如法律规定，我们还会在实施此等修改前征求您的同意或确保存在此等处理的其他法律依据。本政策最后修改日期为
                [2019 年 5月 21 日]</p>
            <br/>
            <h2>PRIVACY POLICY</h2>
            <p>NIKE Sport (China) Company 【耐克体育（中国）有限公司】 together with {cookie.load("store_name")} (“We”) are
                responsible for the processing of your personal data obtained via NIKE Store Partner (NSP) WeChat
                Service Accounts (the "{cookie.load("store_name")}").</p>
            <p>PROCESSING PERSONAL DATA</p>
            <p>When you visit the Service Account, we collect and process personal data that you submit or that we
                may ask you for, including your name, mobile number, behavior data and other information that may
                be submitted.</p>
            <p>SHARING DATA</p>
            <p>The personal data we obtain through the Service Account
                and website will be shared between NIKE Sport (China) Company 【耐克体育（中国）有限公司】
                and {cookie.load("store_name")} , to enable us to carry out services you signed up for through
                the Service Account and/or website.</p>
            <p>The personal data we obtain through the Service
                Account and website may also be shared with other third parties involved in carrying out
                services or other tasks on our behalf. These third parties process your personal data only on
                our behalf and instruction for the purposes mentioned in this Policy. </p>
            <p>We may also
                disclose your personal data upon governmental request, in response to a court order, when
                required by law or to protect our or others" rights, property or safety. We may further share
                information to prevent illegal uses of the Service Account or violations of the Terms of Use or
                defend ourselves against third party claims. </p>
            <p>We do not provide your personal data to
                agencies or outside companies for marketing purposes and do not sell, trade, share or transfer
                your personal data to any outside parties other than those identified in this Policy.</p>
            <p>YOUR
                PERSONAL DATA RIGHTS</p>
            <p>You have the right to request: (i) access to your personal data; (ii)
                an electronic copy of your personal data (portability); (iii) correction of your personal data
                if it is incomplete or inaccurate; or (iv) deletion of your personal data, in certain
                circumstances provided by applicable law. These rights are not absolute. Where we have obtained
                your consent for the processing of your personal data, you have the right to withdraw your
                consent at any time. </p>
            <p>You can access and modify your information through “My Service” button under the Service Account.
                You can also contact our Client Service team via “Online Client Service” button under the
                Service Account for further information or to exercise these rights.</p>
            <p>CONFIDENTIALITY AND
                PROTECTION </p>
            <p>The Service Account uses a range of security technologies and procedures
                to protect your personal data against unauthorized access, use and disclosure. The personal
                data that the Service Account gathers is stored in a secure environment that is inaccessible
                to the public.CHANGES TO OUR PRIVACY POLICY</p>
            <p>If we decide to change our privacy policy,
                we will post the changed policy on the Service Account. You are advised to regularly check
                whether our privacy policy has changed. If we materially change the way in which we process
                your personal data, we will provide you with prior notice, or where legally required,
                request your consent or ensure that there is another legal basis for such processing, prior
                to implementing such changes. This policy was last modified in [April 15th, 2019].</p>
            </div>
        </div>
    )
}

export default Priacy;